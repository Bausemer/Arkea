import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { CharactersModule } from './Characters.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CharactersModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.CHARACTERS_MICROSERVICE_HOST,
        port: process.env.CHARACTERS_MICROSERVICE_PORT,
        
      }
    },
  );
  await app.listen();
}
bootstrap();