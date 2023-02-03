import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';

import { RedisService } from '~libs/Redis/Redis.service';

import { JwtPayload } from './DTOs/JwtPayload.dto';
import { User } from './DTOs/User.dto';

@Injectable()
export class AzureADStrategy_Service extends PassportStrategy(Strategy, 'aad') {

  constructor (
    private readonly redis: RedisService<string, User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate (payload: JwtPayload): Promise<string> {
    const user = await this.redis.getOrSetCacheData(payload.username);
    if ( !user.username ) throw new UnauthorizedException();

    return user.username;
  }
}
