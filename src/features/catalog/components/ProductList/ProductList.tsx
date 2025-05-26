import CircularProgress from '@mui/material/CircularProgress';
import { useGetProductsQuery } from '../../../../api/productsApi';
import Box from '@mui/material/Box';
import type { Product } from '../../../../types/productsApi';

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
    <div className="product-list">
      {data?.results.map((product: Product) => {
        const price = product.masterVariant.prices[0].value;
        const formattedPrice = (price.centAmount / CENTS_IN_EURO).toFixed(price.fractionDigits);
        return (
          <Box key={product.id} display="flex" flexDirection="column" maxWidth="300px">
            <h4>{product.name['en-GB'] || ''}</h4>
            <div>{product.description['en-GB'] || ''}</div>
            <div>{`${formattedPrice}€`}</div>
            <img
              src={product.masterVariant.images[0].url}
              alt={product.masterVariant.images[0].label}
            />
          </Box>
        );
      })}
    </div>
  );
}
