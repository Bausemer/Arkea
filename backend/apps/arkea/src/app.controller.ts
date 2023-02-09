import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';

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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
