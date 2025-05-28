import Box from '@mui/material/Box';
import ProductList from './components/ProductList/ProductList';
import CategoryList from './components/CategoryList/CategoryList';
import { CategoryProvider } from '../../providers/CategoriesProvider';
import CustomBreadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Sort from './components/Sort/Sort';
import { useState } from 'react';
import type { SortValues } from './types/sort';

export default function CatalogPage() {
  const [sortValue, setSortValue] = useState<SortValues>('');
  return (
    <CategoryProvider>
      <Box
        component="div"
        sx={{
          width: '100%',
          maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
          gap: 2,
          margin: 'auto',
          py: { lg: 8, md: 6, xs: 4 },
        }}
      >
        <Grid container spacing={3}>
          <Grid size={3}>
            <CategoryList />
          </Grid>
          <Grid size={9} display={'grid'} gap={2}>
            <CustomBreadcrumbs />
            <Sort sortValue={sortValue} onChange={setSortValue} />
            <ProductList sortValue={sortValue} />
          </Grid>
        </Grid>
      </Box>
    </CategoryProvider>
  );
}
