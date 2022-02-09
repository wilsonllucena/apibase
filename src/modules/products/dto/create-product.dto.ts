import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  category: string;

  img?: string;

  size?: string;

  color: string;

  @IsNotEmpty()
  @IsInt()
  price: number;
}
