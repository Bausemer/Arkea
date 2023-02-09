import { firstValueFrom, lastValueFrom } from 'rxjs';

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Character_DTO } from '~libs/dtos/Character.dto';

import { CHARACTERS_SERVICE } from './services';

@Injectable()
export class AppService {

  constructor (
    @Inject(CHARACTERS_SERVICE) private charactersClient: ClientProxy
  ) { }

  async createCharacter (character: Character_DTO): Promise<Character_DTO> {
    return firstValueFrom(this.charactersClient.send<Character_DTO>('createCharacter', { character }))
  }

  getHello(): string {
    return 'Hello World!';
  }
}
