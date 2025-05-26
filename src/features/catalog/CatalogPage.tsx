import Box from '@mui/material/Box';
import ProductList from './components/ProductList/ProductList';

export default function Catalog() {
  return (
    <Box
      component="div"
      sx={{
        maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 'auto',
        py: { lg: 8, md: 6, xs: 4 },
      }}
    >
      <ProductList />
    </Box>
  );
}
