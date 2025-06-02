import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useCategory } from '../../../../contexts/CategoryContext';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function CustomBreadcrumbs() {
  const { isLoading, isError, currentCategoryChain, categories, setselectedIndex } = useCategory();
  if (isLoading || isError) return null;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, categoryId: string) {
    event.preventDefault();
    setselectedIndex(categories.findIndex((category) => category.id === categoryId));
  }

  return (
    <Box px={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ minHeight: '26px' }}>
        {currentCategoryChain.map((category, id) => {
          if (id === currentCategoryChain.length - 1) {
            return (
              <Typography sx={{ fontFamily: 'Josefin Sans' }}>{category.categoryName}</Typography>
            );
          }
          return (
            <Link onClick={(event) => handleClick(event, category.id)}>
              {category.categoryName}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
