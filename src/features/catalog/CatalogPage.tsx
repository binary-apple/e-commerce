import Box from '@mui/material/Box';
import ProductList from './components/ProductList/ProductList';
import CategoryList from './components/CategoryList/CategoryList';
import { CategoryProvider } from '../../providers/CategoriesProvider';
import CustomBreadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Sort from './components/Sort/Sort';
import { useState } from 'react';
import type { SortValues } from './types/sort';
import Search from './components/Search/Search';
import Filters from './components/Filters/Filters';

export default function CatalogPage() {
  const [sortValue, setSortValue] = useState<SortValues>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [petType, setPetType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
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
        <Box component="div" sx={{ display: 'flex', gap: { sm: 2, xs: 0.5 }, width: '100%' }}>
          <Box sx={{ minWidth: { sm: '25%', xs: '30%' } }}>
            <CategoryList />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { sm: 2, xs: 0.5 },
              maxWidth: { sm: '75%', xs: '70%' },
              width: { sm: '75%', xs: '70%' },
            }}
          >
            <Box component="div" display="flex" flexDirection="column" gap={2}>
              <Box component="div" display="flex" gap={2}>
                <Search searchValue={searchValue} onChange={setSearchValue} />
                <Sort sortValue={sortValue} onChange={setSortValue} />
              </Box>
              <Filters
                petType={petType}
                onPetTypeChange={setPetType}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />
            </Box>
            <Box width="100%" display="flex" justifyContent={'center'}>
              <ProductList
                sortValue={sortValue}
                searchValue={searchValue}
                petType={petType}
                selectedPriceRange={priceRange}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </CategoryProvider>
  );
}
