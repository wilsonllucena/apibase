export interface CreateCartDto {
  user: string;
  products: Array<{ product: string; quantity: number }>;
}
