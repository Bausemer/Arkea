import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { getEnvVariables } from '~libs/config/helpers';
import { RabbitMqService } from '~libs/rabbit-mq';

import { CharactersModule } from './characters.module';

async function bootstrap() {
  const env = getEnvVariables();
  const app = await NestFactory.create(CharactersModule);
  const rabbitMqService = app.get<RabbitMqService>(RabbitMqService);
  app.connectMicroservice(rabbitMqService.getOptions('CHARACTERS'));
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
}
bootstrap();
