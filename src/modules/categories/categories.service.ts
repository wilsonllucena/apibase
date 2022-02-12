import { Category } from './entities/category.entity';
import { NotFoundError } from './../../errors/NotFoundError';
import { AlreadyExistsError } from './../../errors/AlreadyExistsError';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findByName(
      createCategoryDto.name,
    );
    if (category) {
      throw new AlreadyExistsError('Category already exists');
    }
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }

    await this.categoryRepository.remove(id);
  }
}
