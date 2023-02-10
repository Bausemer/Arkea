import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor (
    private readonly charactersService: CharactersService
  ) { }

  @EventPattern('createCharacter')
  async create (@Payload() { character }:{ character: Character_DTO }, @Ctx() context: RmqContext): Promise<Character_DTO> {
    const result = await this.charactersService.create(character);
    return result;
  }

  @EventPattern('getByName')
  async getByName (@Payload() { name }:{ name: string }, @Ctx() context: RmqContext ): Promise<Character_DTO> {
    return this.charactersService.getByName(name);
  }

  @EventPattern('deleteByName')
  async deleteByName (@Payload() { name }:{ name: string }, @Ctx() context: RmqContext ): Promise<Character_DTO> {
    return this.charactersService.deleteByName(name);
  }

  @EventPattern('listCharacters')
  async listCharacters (): Promise<Character_DTO[]> {
    return this.charactersService.listCharacters();
  }

}
