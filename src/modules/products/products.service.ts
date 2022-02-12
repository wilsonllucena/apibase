import { AlreadyExistsError } from './../../errors/AlreadyExistsError';
import { Product } from './schema/products.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (await this.productModel.findOne({ title: createProductDto.title })) {
      throw new AlreadyExistsError('Product already exists');
    }
    return await this.productModel.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (await this.productModel.findOne({ title: updateProductDto.title })) {
      throw new AlreadyExistsError('Product already exists');
    }
    const product = await this.productModel.updateOne(
      { _id: id },
      updateProductDto,
    );
    return product;
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}
