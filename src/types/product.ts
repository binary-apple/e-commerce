export type ProductConfig = {
  name: string;
  price: number;
  image: string;
  description: string;
  place: string;
  color: 'color-cheap' | 'color-average' | 'color-expensive';
};
