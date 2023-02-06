import * as joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from '~libs/abstractDatabase';

import { CharactersController } from './characters.controller';
import { CharactersRepository } from './characters.repository';
import { CharactersService } from './characters.service';
import { Character, CharacterSchema } from './schemas/character.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        MONGODB_URI: joi.string().required(),
        // PORT: joi.number().required()
      }),
      envFilePath: './apps/characters/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
  ],
  controllers: [CharactersController],
  providers: [
    CharactersService,
    CharactersRepository
  ],
})
export class CharactersModule {}
