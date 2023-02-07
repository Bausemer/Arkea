import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Character_DTO } from '~libs/dtos/Character.dto';

@Schema({ versionKey: false, collection: 'Characters' })
export class Character extends Character_DTO {
  @Prop()
  name: string;

  @Prop()
  characterClass: string;

  @Prop()
  player: string;

  @Prop()
  level: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);