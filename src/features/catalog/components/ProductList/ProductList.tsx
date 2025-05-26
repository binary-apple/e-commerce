import CircularProgress from '@mui/material/CircularProgress';
import { useGetProductsQuery } from '../../../../api/productsApi';
import Box from '@mui/material/Box';
import type { Product } from '../../../../types/productsApi';
import { NavLink } from 'react-router';
import Grid from '@mui/material/Grid';

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
        return (
          <Grid key={product.id} size={3}>
            {/* TODO: replace the Box below to product card */}
            <Box
              display="flex"
              flexDirection="column"
              key={product.id}
              component={NavLink}
              to={`/product/${product.id}`}
              sx={{ textDecoration: 'none', color: 'text.primary' }}
            >
              <h4>{product.name['en-GB'] || ''}</h4>
              <div>{product.description['en-GB'] || ''}</div>
              <div>{`${formattedPrice}€`}</div>
              <img
                src={product.masterVariant.images[0].url}
                alt={product.masterVariant.images[0].label}
              />
              <div>{`Color: ${product.masterVariant.attributes.find((attribute) => attribute.name === 'color')?.value.key}`}</div>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
