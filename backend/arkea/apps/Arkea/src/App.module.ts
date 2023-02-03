import { Module } from '@nestjs/common';

import { AppController } from './App.controller';
import { AppService } from './App.service';
import { AuthController } from './Auth/Auth.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
