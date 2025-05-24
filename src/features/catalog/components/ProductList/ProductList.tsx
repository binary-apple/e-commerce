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
        // TODO: refactor
        const price = product.masterData.staged.masterVariant.prices[0].value;
        return (
          <Box key={product.id} display="flex" flexDirection="column" maxWidth="300px">
            <h4>{product.masterData.staged.name['en-GB'] || ''}</h4>
            <div>{product.masterData.staged.description['en-GB'] || ''}</div>
            <div>{`${(price.centAmount / CENTS_IN_EURO).toFixed(price.fractionDigits)}€`}</div>
            <img
              src={product.masterData.staged.masterVariant.images[0].url}
              alt={product.masterData.staged.masterVariant.images[0].label}
            />
          </Box>
        );
      })}
    </div>
  );
}
