import type { ProductConfig } from '../../types/product';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from './constants.ts';

export default function CatalogPage() {
  return (
    <>
      {products.map((product: ProductConfig, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </>
  );
}
