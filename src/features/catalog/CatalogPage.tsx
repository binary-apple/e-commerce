import Box from '@mui/material/Box';
import ProductList from './components/ProductList/ProductList';
import CategoryList from './components/CategoryList/CategoryList';
import { CategoryProvider } from '../../providers/CategoriesProvider';
import CustomBreadcrumbs from './components/Breadcrumbs/Breadcrumbs';

export default function Catalog() {
  return (
    <CategoryProvider>
      <Box
        component="div"
        sx={{
          maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
          gap: 2,
          margin: 'auto',
          py: { lg: 8, md: 6, xs: 4 },
        }}
      >
        <Box width="100%" display="flex" gap={2}>
          <Box component="div" minWidth="30%" height="fit-content">
            <CategoryList />
          </Box>
          <Box maxWidth="calc(70% - 16px)">
            <CustomBreadcrumbs />
            <ProductList />
          </Box>
        </Box>
      </Box>
    </CategoryProvider>
  );
}
