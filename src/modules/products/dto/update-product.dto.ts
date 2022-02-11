import { Category } from './../../categories/entities/category.entity';
import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateProductDto {
  title?: string;

  description?: string;

  category?: Category;

  img?: string;

  size?: string;

  color?: string;

  price?: number;
}
