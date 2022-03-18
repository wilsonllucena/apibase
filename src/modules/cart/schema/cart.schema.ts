import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../../products/entities/products.entity';
import { User } from './../../users/schemas/user.entity';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Product' })
  products: [
    {
      product: Product;
      quantity: number;
    },
  ];

  @Prop({ default: false })
  closed: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: true;

  @Prop({ type: Date, default: Date.now })
  updatedAt: true;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
