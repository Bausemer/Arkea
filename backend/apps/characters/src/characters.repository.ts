import { Connection, Model } from 'mongoose';

import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '~libs/abstractDatabase';

import { Character } from './schemas/character.schema';

@Injectable()
export class CharactersRepository extends AbstractRepository<Character> {
  protected readonly logger = new Logger(CharactersRepository.name);

  constructor (
    @InjectModel(Character.name) characterModel: Model<Character>,
    @InjectConnection() connection: Connection
  ) {
    super(characterModel, connection)
  }
}