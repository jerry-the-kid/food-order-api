import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        return req.cookies.accessToken;
      },
      secretOrKey: '19GHEbSta4p5pL07U46EzaIZXHouLC',
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
