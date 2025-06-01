import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useGetProductsQuery } from '../../../../api/productsApi';
import type { Product } from '../../../../types/productsApi';
import ProductCard from '../productCard/ProductCard.tsx';
import { useCategory } from '../../../../contexts/CategoryContext.tsx';
import type { SortValues } from '../../types/sort.ts';
import formatDataForSticker from '../../../../utils/formatDataForSticker/formatDataForSticker.ts';

export default function ProductList({
  sortValue,
  searchValue,
}: {
  sortValue: SortValues;
  searchValue: string;
}) {
  const { isLoading: isCategoryLoading, selectedCategory } = useCategory();

  const {
    data,
    isLoading: isProductLoading,
    isError,
    error,
  } = useGetProductsQuery({
    categoryId: selectedCategory?.id,
    sortOption: sortValue,
    searchOption: searchValue,
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
        return <ProductCard key={product.id} product={formatDataForSticker(product)} />;
      })}
    </Grid>
  );
}
