import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument } from '~libs/abstractDatabase';

@Schema({ versionKey: false })
export class Character extends AbstractDocument{
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