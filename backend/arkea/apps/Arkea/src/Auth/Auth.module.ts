import { Module } from '@nestjs/common';

import { RedisModule } from '~libs/Redis/Redis.module';

import { AuthController } from './Auth.controller';
import { LoginService } from './Login.service';

@Module({
  imports: [
    RedisModule.forRoot({ttl: +process.env.REDIS_TTL})
  ],
  providers: [LoginService],
  controllers: [AuthController, AuthController],
})
export class AuthModule {}
