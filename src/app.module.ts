import 'dotenv/config';

import { CartModule } from './modules/cart/cart.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipes/validation.pipe';
import { AuthController } from './modules/auth/auth.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://admin:2a4tmohPxvZHNLLa@cluster0.p9cvk.mongodb.net/poc_store`,
    ),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
