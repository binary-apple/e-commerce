import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useGetProductsQuery } from '../../../../api/productsApi';
import type { Product } from '../../../../types/productsApi';
import type { ProductCardConfig } from '../../../../types/product';
import ProductCard from '../productCard/ProductCard.tsx';
import { useCategory } from '../../../../contexts/CategoryContext.tsx';
import type { SortValues } from '../../types/sort.ts';

const CENTS_IN_EURO = 100;

export default function ProductList({ sortValue }: { sortValue: SortValues }) {
  const { isLoading: isCategoryLoading, selectedCategory } = useCategory();

  const {
    data,
    isLoading: isProductLoading,
    isError,
    error,
  } = useGetProductsQuery({
    categoryId: selectedCategory?.id,
    sortOption: sortValue,
  });
  if (isCategoryLoading || isProductLoading) {
    return <CircularProgress size="3rem" />;
  }
  if (isError) {
    return <Box>Error {JSON.stringify(error)}</Box>;
  }
  return (
    <Grid container spacing={3} justifyContent="center">
      {data?.results.map((product: Product) => {
        const price = product.masterVariant.prices[0].value;
        const formattedPrice = (price.centAmount / CENTS_IN_EURO).toFixed(price.fractionDigits);

        const typedProduct: ProductCardConfig = {
          key: product.key,
          name: product.name['en-GB'] || '',
          price: formattedPrice,
          image: product.masterVariant.images[0].url,
          description: product.description['en-GB'] || '',
          color:
            product.masterVariant.attributes.find((attribute) => attribute.name === 'color')?.value
              .key || 'color-cheap',
          place: '',
          //todo: replace place with country with city!
        };

        return <ProductCard key={product.id} product={typedProduct} />;
      })}
    </Grid>
  );
}
