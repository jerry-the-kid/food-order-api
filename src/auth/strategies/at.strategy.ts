import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types';
import * as process from 'process';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        return req.cookies.accessToken;
      },
      secretOrKey: process.env['AT.SECRET'],
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
