import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailPwAuthDto, SignInDto } from './dto';
import { CookieOptions, Request, Response } from 'express';
import { RtGuard } from '../common/guard';
import { GetCurrentUser, Public } from '../common/decorator';
import { CreateOtpDto } from './dto/create-otp.dto';
import { Serialize } from '../common/interceptor';
import { MeDto } from './dto/me.dto';

function createSendCookie(response: Response, data, deleteCookies = false) {
  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
  };
  const accessToken = data?.access_token ?? null;
  const refreshToken = data?.refresh_token ?? null;

  response.cookie('accessToken', accessToken, cookieOptions);
  response.cookie('refreshToken', refreshToken, cookieOptions);

  if (deleteCookies) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
  }
}

@Controller('auth')
export class AccountsController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  @Serialize(MeDto)
  getMyInfo(@Req() req: Request) {
    const user = req.user;
    return user;
    // return this.authService.getMyInfo();
  }

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
    return data.user.restaurant
      ? {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          restaurantId: data.user.restaurant['id'],
        }
      : { id: data.user.id, email: data.user.email, role: data.user.role };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logOut(
    @Res({ passthrough: true }) response: Response,
    @GetCurrentUser('id') userId: number,
  ) {
    createSendCookie(response, null, true);
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

  @Public()
  @Post('local/restaurant-login')
  @HttpCode(HttpStatus.OK)
  async restaurantLogin(@Body() dto: EmailPwAuthDto) {
    return this.authService.restaurantLogin(dto);
  }
}
