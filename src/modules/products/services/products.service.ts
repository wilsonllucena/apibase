import { NotFoundError } from '../../../errors/NotFoundError';
import { AlreadyExistsError } from '../../../errors/AlreadyExistsError';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/products.entity';
import {
  convertNumberToCurrencyBRL,
  convertNumberToDecimal,
} from 'src/shared/helpers/decimal';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log(createProductDto);

    const productAlreadyExists = await this.productModel
      .findOne({ title: createProductDto.title })
      .exec();

    if (productAlreadyExists) {
      throw new AlreadyExistsError('Product already exists');
    }
    const data = {
      ...createProductDto,
      price: convertNumberToCurrencyBRL(createProductDto.price),
    };

    return this.productModel.create(data);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    const price = convertNumberToCurrencyBRL(product.price);
    return { ...product.toJSON(), price };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productExist = await this.productModel.findOne({ _id: id }).exec();
    if (!productExist) {
      throw new NotFoundError('Product not found');
    }
    if (
      productExist._id.toString() !== id &&
      updateProductDto.title === productExist.title
    ) {
      throw new AlreadyExistsError('Product already exists');
    }

    const product = await this.productModel
      .updateOne({ _id: id }, updateProductDto)
      .exec();
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await product.delete();
  }
}
