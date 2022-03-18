import { NotFoundError } from '../../../errors/NotFoundError';
import { AlreadyExistsError } from '../../../errors/AlreadyExistsError';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  create(createProductDto: CreateProductDto): Promise<Product> {
    if (this.productModel.findOne({ title: createProductDto.title })) {
      throw new AlreadyExistsError('Product already exists');
    }
    return this.productModel.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productExists = await this.productModel.findOne({ _id: id });
    if (!productExists) {
      throw new NotFoundError('Product not found');
    }

    if (await this.productModel.findOne({ title: updateProductDto.title })) {
      throw new AlreadyExistsError('Product already exists');
    }

    const product = await this.productModel.updateOne(
      { _id: id },
      updateProductDto,
    );
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await product.delete();
  }
}
