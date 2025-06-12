import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useGetProductsQuery } from '../../../../api/productsApi';
import type { Product } from '../../../../types/productsApi';
import ProductCard from '../productCard/ProductCard.tsx';
import { useCategory } from '../../../../contexts/CategoryContext.tsx';
import type { SortValues } from '../../types/sort.ts';
import formatDataForSticker from '../../../../utils/formatDataForSticker/formatDataForSticker.ts';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const PRODUCTS_LIMIT = 9;

export default function ProductList({
  sortValue,
  searchValue,
  petType,
  selectedPriceRange: priceRange,
}: {
  sortValue: SortValues;
  searchValue: string;
  petType: string[];
  selectedPriceRange: number[];
}) {
  const {
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    selectedCategory,
  } = useCategory();

  const [searchParameters, setSearchParameters] = useSearchParams();

  const getInitialPage = useCallback(() => {
    return +(searchParameters.get('page') ?? 1);
  }, [searchParameters]);

  const [page, setPage] = useState(getInitialPage());

  const {
    data,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductsQuery({
    categoryId: selectedCategory?.id,
    sortOption: sortValue,
    searchOption: searchValue,
    petType: petType,
    selectedPriceRange: priceRange,
    offset: (page - 1) * PRODUCTS_LIMIT,
    limit: PRODUCTS_LIMIT,
  });

  const totalProducts = data?.total ?? 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_LIMIT);

  useEffect(() => {
    setPage(getInitialPage());
  }, [getInitialPage]);
  const handleChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    const newParameters = new URLSearchParams(searchParameters);
    newParameters.set('page', String(page));
    setSearchParameters(newParameters);
  };

  if (isCategoryLoading || isProductLoading) {
    return <CircularProgress size="3rem" />;
  }
  if (isProductError || isCategoryError) {
    return <Typography>Something went wrong, please try again</Typography>;
  }
  return (
    <>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        {data?.results.length === 0 && <Typography>Nothing was found...</Typography>}
        {data?.results.length !== 0 && (
          <>
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
            <Grid container spacing={1}>
              {data?.results.map((product: Product) => {
                return <ProductCard key={product.id} product={formatDataForSticker(product)} />;
              })}
            </Grid>
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
          </>
        )}
      </Box>
    </>
  );
}
