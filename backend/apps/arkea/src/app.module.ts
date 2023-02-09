import { Module } from '@nestjs/common';

import { RabbitMqModule } from '../../../libs/rabbit-mq/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CHARACTERS_SERVICE } from './services';

@Module({
  imports: [RabbitMqModule.register({
    name: CHARACTERS_SERVICE
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
