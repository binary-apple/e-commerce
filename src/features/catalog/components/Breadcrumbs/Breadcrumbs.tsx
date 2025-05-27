import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useCategory } from '../../../../contexts/CategoryContext';
import Link from '@mui/material/Link';

export default function CustomBreadcrumbs() {
  const { isLoading, isError, currentCategoryChain } = useCategory();
  if (isLoading || isError) return null;
  return (
    <Box>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {currentCategoryChain.map((category) => (
          <Link>{category.categoryName}</Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
