import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useCategory } from '../../../../contexts/CategoryContext';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function CustomBreadcrumbs() {
  const { isLoading, isError, currentCategoryChain } = useCategory();
  if (isLoading || isError) return null;
  return (
    <Box>
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ height: '26px' }}>
        {currentCategoryChain.map((category, id) => {
          if (id === currentCategoryChain.length - 1) {
            return (
              <Typography sx={{ fontFamily: 'Josefin Sans' }}>{category.categoryName}</Typography>
            );
          }
          return <Link>{category.categoryName}</Link>;
        })}
      </Breadcrumbs>
    </Box>
  );
}
