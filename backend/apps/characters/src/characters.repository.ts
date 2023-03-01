import { Model } from 'mongoose';

import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { Character } from './schemas/character.schema';

@Injectable()
export class CharactersRepository {
  protected readonly logger = new Logger(CharactersRepository.name);

  constructor (
    @InjectModel(Character.name) private readonly characterModel: Model<Character>,
  ) { }

  async create (character: Character_DTO): Promise<Character_DTO> {
    return this.characterModel.create(character);
  }

  async getByName (name: string, omitID?: boolean): Promise<Character_DTO> {
    if(omitID) return this.characterModel.findOne({name})
    return this.characterModel.findOne({ name });
  }

  async deleteByName (name: string): Promise<Character_DTO> {
    return this.characterModel.findOneAndDelete({ name });
  }

  async listCharacters (): Promise<Character_DTO[]> {
    return this.characterModel.find({});
  }
}