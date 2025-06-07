import type { Discount } from './productsApi.ts';

export type ProductCardConfig = {
  key: string;
  name: string;
  price: string;
  image: string;
  description: string;
  place: string;
  color: string;
  currencyCode: string;
  discount?: Discount;
};
