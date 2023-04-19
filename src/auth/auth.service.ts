import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private repo: Repository<Account>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async getOtp(email: string) {
    const user = await this.repo.findOneBy({ email });
    const otp = this.generateOTP(6);
    const otpExp = new Date(Date.now() + 3 * 60 * 1000);
    let userUpdated: Account;
    if (!user) {
      userUpdated = await this.repo.save({ email, otp, otpExpires: otpExp });
    } else {
      userUpdated = await this.repo.save({ ...user, otp, otpExpires: otpExp });
    }
    await this.mailService.sendOtpConfirmation(userUpdated);

    return {
      email: userUpdated.email,
      otp: userUpdated.otp,
    };
  }

  async signUpLocal(dto: AuthDto) {
    const hash = await this.hashData(dto.password);

    const newUser = await this.repo.save({
      email: dto.email,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  // async singinLocal(dto: AuthDto): Promise<Tokens> {
  //   const user = await this.repo.findOneBy({ email: dto.email });
  //   console.log(user);
  //
  //   if (!user) throw new ForbiddenException('Access Denied');
  //
  //   const passwordMatches = await argon.verify(user.password, dto.password);
  //   if (!passwordMatches) throw new ForbiddenException('Access Denied');
  //
  //   const tokens = await this.getTokens(user.id, user.email);
  //   await this.updateRtHash(user.id, tokens.refresh_token);
  //   return tokens;
  // }

  async logout(userId: number) {
    await this.repo
      .createQueryBuilder()
      .update({ hashRt: null })
      .where('id=:id', { id: userId })
      .andWhere('hashRt IS NOT NULL')
      .execute();
  }

  async hashData(data: string) {
    return await argon.hash(data);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        { secret: 'at-secret', expiresIn: 60 * 15 },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        { secret: 'rt-secret', expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.repo.update(userId, { hashRt: hash });
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.repo.findOneBy({ id: userId });

    if (!user || !user.hashRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashRt, rt);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  generateOTP(length: number) {
    let otp = '';
    const characters = '0123456789';

    for (let i = 0; i < length; i++) {
      otp += characters[Math.floor(Math.random() * characters.length)];
    }

    return otp;
  }
}
