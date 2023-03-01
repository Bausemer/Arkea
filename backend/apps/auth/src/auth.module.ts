import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { getEnvVariables } from '~libs/config/helpers';

import { AuthController } from './auth.controller';
import { AzureADGuard } from './Auth.guard';
import { AuthService } from './auth.service';
import { JwtStrategy_Service } from './JwtStrategy.service';

const env = getEnvVariables();

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    AzureADGuard,
    JwtStrategy_Service
  ],
  controllers: [
    AuthController,
    
  ],
  exports: [
    AzureADGuard
  ]
})
export class AuthModule {}
