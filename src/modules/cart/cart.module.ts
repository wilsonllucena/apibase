import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema, Cart } from './schema/cart.schema';
import { CartRepository } from './repository/cart.repository';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
