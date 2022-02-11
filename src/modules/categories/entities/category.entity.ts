import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ unique: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
