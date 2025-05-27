import CircularProgress from '@mui/material/CircularProgress';
import { useGetProductsQuery } from '../../../../api/productsApi';
import Box from '@mui/material/Box';
import type { Product } from '../../../../types/productsApi';
import Grid from '@mui/material/Grid';
import type { ProductCardConfig } from '../../../../types/product.ts';
import ProductCard from '../../../product/ProductCard.tsx';

const CENTS_IN_EURO = 100;

export default function ProductList() {
  const { data, isLoading, isError, error } = useGetProductsQuery({});
  if (isLoading) {
    return <CircularProgress size="3rem" />;
  }
  if (isError) {
    return <Box>Error {JSON.stringify(error)}</Box>;
  }
  return (
    <Grid container spacing={3}>
      {data?.results.map((product: Product) => {
        const price = product.masterVariant.prices[0].value;
        const formattedPrice = (price.centAmount / CENTS_IN_EURO).toFixed(price.fractionDigits);

        const typedProduct: ProductCardConfig = {
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
