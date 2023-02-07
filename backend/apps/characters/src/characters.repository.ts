import { Model } from 'mongoose';

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { Character } from './schemas/character.schema';

@Injectable()
export class CharactersRepository {
  protected readonly logger = new Logger(CharactersRepository.name);

  constructor (
    @InjectModel(Character.name) private readonly characterModel: Model<Character>,
  ) { }

  async create(character: Character): Promise<Character_DTO> {
    return this.characterModel.create(character);
  }
}