import Box from '@mui/material/Box';
import ProductList from './components/ProductList/ProductList';
import CategoryList from './components/CategoryList/CategoryList';
import { CategoryProvider } from '../../providers/CategoriesProvider';
import CustomBreadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Sort from './components/Sort/Sort';
import { useState } from 'react';
import type { SortValues } from './types/sort';
import Search from './components/Search/Search';
import Filters from './components/Filters/Filters';

export default function CatalogPage() {
  const [sortValue, setSortValue] = useState<SortValues>('');
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <CategoryProvider>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          width: '100%',
          maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
          gap: 2,
          margin: '0 auto auto',
          py: { lg: 6, md: 4, xs: 2 },
        }}
      >
        <CustomBreadcrumbs />
        <Grid container spacing={3}>
          <Grid size={3}>
            <CategoryList />
          </Grid>
          <Grid size={9} display={'grid'} gap={2}>
            <Box component="div" display="flex" flexDirection="column" gap={2}>
              <Box component="div" display="flex" gap={2}>
                <Search searchValue={searchValue} onChange={setSearchValue} />
                <Sort sortValue={sortValue} onChange={setSortValue} />
              </Box>
              <Filters />
            </Box>
            <ProductList sortValue={sortValue} searchValue={searchValue} />
          </Grid>
        </Grid>
      </Box>
    </CategoryProvider>
  );
}
