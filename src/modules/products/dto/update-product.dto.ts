import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateProductDto {
  title: string;

  description: string;

  category: string;

  img?: string;

  size?: string;

  color: string;

  price: number;
}
