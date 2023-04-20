import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { Request, Response } from 'express';
import { AtGuard, RtGuard } from '../common/guard';
import { GetCurrentUser, Public } from '../common/decorator';
import { CreateOtpDto } from './dto/create-otp.dto';

function createSendCookie(response: Response, data) {
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions['secure'] = true;
  response.cookie('accessToken', data.access_token, cookieOptions);
  response.cookie('refreshToken', data.refresh_token, cookieOptions);
}

@Controller('auth')
export class AccountsController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/otp')
  @Public()
  getOtp(@Body() dto: CreateOtpDto) {
    return this.authService.getOtp(dto.email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/signin')
  async signInLocal(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.singinLocal(body);
    createSendCookie(response, data);
    return { email: data.user.email, role: data.user.role };
  }

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
  async refreshToken(@Req() req: Request) {
    const user = req.user;
    const data = await this.authService.refreshToken(
      user['id'],
      user['refreshToken'],
    );
    createSendCookie(req.res, data);
  }
}
