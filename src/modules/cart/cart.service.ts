import { NotFoundError } from './../../errors/NotFoundError';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schema/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartRepository } from './repository/cart.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.findAll();
  }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartRepository.create(createCartDto);
  }

  async findCartByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findCartByUserId(userId);
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }
    return cart;
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne(id);
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }
    return cart;
  }

  async update(id: string, updateCartDTO: UpdateCartDto): Promise<any> {
    const cart = await this.cartRepository.findOne(id);
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }
    return await this.cartRepository.update(id, updateCartDTO);
  }

  async remove(id: string): Promise<any> {
    const cart = await this.cartRepository.findOne(id);
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }
    return await this.cartRepository.remove(id);
  }
}
