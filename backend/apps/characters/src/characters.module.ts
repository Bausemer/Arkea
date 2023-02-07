import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getConnection } from '~libs/config/mongodb';

import { CharactersController } from './characters.controller';
import { CharactersRepository } from './characters.repository';
import { CharactersService } from './characters.service';
import { Character, CharacterSchema } from './schemas/character.schema';

@Module({
  imports: [
    MongooseModule.forRoot(...getConnection()),
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
  ],
  controllers: [CharactersController],
  providers: [
    CharactersService,
    CharactersRepository
  ],
})
export class CharactersModule {}
