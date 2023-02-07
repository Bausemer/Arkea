import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CharactersModule } from './characters.module';

async function bootstrap() {
  const app = await NestFactory.create(CharactersModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}
bootstrap();
