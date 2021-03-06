import { Category } from './../../categories/entities/category.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  category: Category;

  img?: string;

  size?: string;

  color: string;

  @IsString()
  price?: string;
}
