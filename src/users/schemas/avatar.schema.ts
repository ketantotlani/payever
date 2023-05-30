import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AvatarDocument = Avatar & Document;

@Schema()
export class Avatar {
  @Prop()
  id: number;

  @Prop()
  hash: string;

  @Prop()
  avatar: string;

}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
