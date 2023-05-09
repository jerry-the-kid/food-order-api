import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtPayload } from '../types';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const accessToken = req.cookies.accessToken;
        try {
          jwt.verify(accessToken, '19GHEbSta4p5pL07U46EzaIZXHouLC');
        } catch (error) {
          // Handle expired refresh token error
          if (error.name === 'TokenExpiredError') {
            throw new ForbiddenException('Access token expired');
          }
        }
        return accessToken;
      },
      secretOrKey: '19GHEbSta4p5pL07U46EzaIZXHouLC',
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
