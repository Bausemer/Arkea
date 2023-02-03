import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';

import { RedisService } from '~libs/Redis/Redis.service';

import { JwtPayload } from './DTOs/JwtPayload.dto';

@Injectable()
export class AzureADStrategy_Service extends PassportStrategy(Strategy, 'aad') {

  constructor (
    private readonly redis: RedisService<string, string>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate (payload: JwtPayload): Promise<string> {
    const aadToken = this.redis.getOrSetCacheData(payload.username);
    if (!aadToken) throw new UnauthorizedException();

    return aadToken;
  }
}
