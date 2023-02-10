import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { AppService } from './app.service';

@Controller('arkea')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('createCharacter')
  async create (@Body() character: Character_DTO): Promise<Character_DTO> {
    const result = await this.appService.createCharacter(character);
    if (!result) throw new HttpException('Character with this name is already existing!', HttpStatus.BAD_REQUEST);
    return result;
  }

  @Get('getByName/:name')
  async getByName (@Param('name') name: string): Promise<Character_DTO> {
    const result = await this.appService.getCharacterByName(name);
    if (!result) throw new HttpException(`There is no character with the name '${name}'!`, HttpStatus.BAD_REQUEST);
    return result;
  }

  @Delete('deleteByName/:name')
  async deleteByName (@Param('name') name: string): Promise<Character_DTO> {
    const result = await this.appService.deleteCharacterByName(name);
    if (!result) throw new HttpException(`There is no character with the name '${name}'!`, HttpStatus.BAD_REQUEST);
    return result;
  }

  @Get('listCharacters')
  async listCharacters (): Promise<Character_DTO[]> {
    return this.appService.listCharacters();
  }

  @Get()
  ping (): string {
    return 'AppController 👍'
  }
}
