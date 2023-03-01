import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';

import { JwtPayload } from './DTOs/JwtPayload.dto';

@Injectable()
export class JwtStrategy_Service extends PassportStrategy(Strategy, 'jwt') {
  constructor (
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate (payload: JwtPayload): Promise<string> {
    
    if (!payload.username) throw new UnauthorizedException();

    return payload.username;
  }
}
