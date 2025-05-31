import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useGetProductsQuery } from '../../../../api/productsApi';
import type { Product } from '../../../../types/productsApi';
import type { ProductCardConfig } from '../../../../types/product';
import ProductCard from '../productCard/ProductCard.tsx';
import { formatPrice } from '../../../../utils/formatPrice/formatPrice.ts';

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
        const formattedPrice = formatPrice(product.masterVariant.prices[0]);
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
          currencyCode: product.masterVariant.prices[0].value.currencyCode,
        };

        return <ProductCard key={product.id} product={typedProduct} />;
      })}
    </Grid>
  );
}
