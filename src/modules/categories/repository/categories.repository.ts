import { Repository } from './../../../shared/protocols/repository';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository implements Repository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoryModel.findOne({ _id: id });
  }

  async findByName(name: string): Promise<Category> {
    return await this.categoryModel.findOne({ name });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    return await this.categoryModel.updateOne({ _id: id }, updateCategoryDto);
  }

  async remove(id: string): Promise<any> {
    return await this.categoryModel.deleteOne({ _id: id });
  }
}
