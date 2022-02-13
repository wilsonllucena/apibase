import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Cart } from './schema/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll(): Promise<Cart[]> {
    return await this.cartService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartService.create(createCartDto);
  }

  @Get('user/:userId')
  async findCartByUserId(@Param('userId') userId: string): Promise<Cart> {
    return await this.cartService.findCartByUserId(userId);
  }

  @Get('/:id')
  async findOne(id: string): Promise<Cart> {
    return await this.cartService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCartDTO: UpdateCartDto,
  ): Promise<any> {
    return await this.cartService.update(id, updateCartDTO);
  }

  @Delete('/:id')
  async remove(id: string): Promise<any> {
    return await this.cartService.remove(id);
  }
}
