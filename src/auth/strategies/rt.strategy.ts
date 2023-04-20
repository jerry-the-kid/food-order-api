import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        return req.cookies.refreshToken;
      },
      secretOrKey: '2BnYpIgYb9woMAcUdeKVlggYTSDDj1',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies.refreshToken;
    return {
      ...payload,
      refreshToken,
    };
  }
}
