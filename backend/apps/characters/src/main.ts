import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { getEnvVariables } from '~libs/config/helpers';

import { CharactersModule } from './characters.module';

async function bootstrap() {
  const env = getEnvVariables();
  const app = await NestFactory.create(CharactersModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(env.CHARACTERS_PORT);
}
bootstrap();
