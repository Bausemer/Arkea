import { Injectable } from '@nestjs/common';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { CharactersRepository } from './characters.repository';

@Injectable()
export class CharactersService {
  constructor (
    private readonly characterRepository: CharactersRepository
  ) { }
  
  async create (character: Character_DTO): Promise<Character_DTO> {
    const existing = await this.characterRepository.getByName(character.name);
    if(!existing)
      return this.characterRepository.create(character);
    return null; 
  }

  async getByName (name: string): Promise<Character_DTO> {
    return this.characterRepository.getByName(name);
  }

  async deleteByName (name: string): Promise<Character_DTO> {
    return this.characterRepository.deleteByName(name);
  }

  async count (): Promise<number> {
    return this.characterRepository.count();
  }
}
