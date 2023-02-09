import { Observable } from 'rxjs';

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
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
    console.log('Payload', character)
    const result = await this.charactersService.create(character);
    console.log('Mongo-Result', result)
    if (!result) throw new HttpException('Character with this name is already existing!', HttpStatus.BAD_REQUEST);
    return result;
  }

  @Get('getByName/:name')
  async getByName (@Param('name') name: string): Promise<Character_DTO> {
    console.log(name)
    return this.charactersService.getByName(name);
  }

  @Delete('deleteByName/:name')
  async deleteByName (@Param('name') name: string): Promise<Character_DTO> {
    return this.charactersService.deleteByName(name);
  }

  @Get()
  async count (): Promise<number> {
    return this.charactersService.count();
  }
}
