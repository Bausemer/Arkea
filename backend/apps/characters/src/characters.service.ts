import { Injectable } from '@nestjs/common';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { CharactersRepository } from './characters.repository';

@Injectable()
export class CharactersService {
  constructor (
    private readonly characterRepository: CharactersRepository
  )
  { }
  async createCharacter (character: Character_DTO): Promise<Character_DTO> {
    return this.characterRepository.create(character);
  }
}
