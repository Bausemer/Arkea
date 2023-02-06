import { Controller, Get } from '@nestjs/common';

import { CharactersService } from './characters.service';

@Controller()
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  getHello (): string {
    console.log('CHARACTERS');
    
    return this.charactersService.getHello();
  }
}
