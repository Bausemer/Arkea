import { Controller, Get, Post } from '@nestjs/common';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { CharactersService } from './characters.service';

@Controller()
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post('/createCharacter')
  async createCharacter (character: Character_DTO): Promise<Character_DTO> {
    return this.charactersService.createCharacter(character);
  }
}
