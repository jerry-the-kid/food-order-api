import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { Request } from 'express';
import { AtGuard, RtGuard } from '../common/guard';
import { GetCurrentUser, Public } from '../common/decorator';
import { CreateOtpDto } from './dto/create-otp.dto';

@Controller('auth')
export class AccountsController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/otp')
  @Public()
  getOtp(@Body() dto: CreateOtpDto) {
    return this.authService.getOtp(dto.email);
  }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('local/signin')
  // signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
  //   return this.authService.singinLocal(dto);
  // }
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AtGuard)
  async logOut(@GetCurrentUser('id') userId: number) {
    await this.authService.logout(userId);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @UseGuards(RtGuard)
  refreshToken(@Req() req: Request) {
    const user = req.user;

    return this.authService.refreshToken(user['id'], user['refreshToken']);
  }
}
