import { Module } from '@nestjs/common';

import { CharactersController } from './Characters.controller';
import { CharactersService } from './Characters.service';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharactersModule {}
