import { Model } from 'mongoose';
import { Cart } from './../schema/cart.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from './../../../shared/protocols/repository';
import { UpdateCartDto } from './../dto/update-cart.dto';
import { CreateCartDto } from './../dto/create-cart.dto';

@Injectable()
export class CartRepository implements Repository {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartModel.create(createCartDto);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartModel.find();
  }

  async findCartByUserId(userId: string): Promise<Cart> {
    return await this.cartModel.findOne({ user: userId, closed: false });
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartModel.findOne({ _id: id });
  }

  async update(id: string, updateCartDTO: UpdateCartDto): Promise<any> {
    return await this.cartModel.updateOne({ _id: id }, updateCartDTO);
  }

  async remove(id: string): Promise<any> {
    return await this.cartModel.deleteOne({ _id: id });
  }
}
