import { Controller, Get, ParseFloatPipe, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { GeocodingService } from './common/service/geocoding.service';
import { Public } from './common/decorator';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly geoCodingService: GeocodingService,
  ) {}

  @Get('me/address/')
  @Public()
  async getHello(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Res() res: Response,
  ) {
    const address = await this.geoCodingService.reverseGeocodeCoordinates(
      lng,
      lat,
    );
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: 'none' as const,
    };
    res.cookie('lat', lat.toString(), options);
    res.cookie('lng', lng.toString(), options);
    res.send({ address });
  }
}
