import { Module } from '@nestjs/common';
import { ProductSchema, Product } from './entities/products.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
