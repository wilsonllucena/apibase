import { Category } from '../../categories/entities/category.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  img?: string;

  @Prop()
  size?: string;

  @Prop()
  color: string;

  @Prop({ default: '0.00' })
  price?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
