import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useCategory } from '../../../../contexts/CategoryContext';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useSearchParams } from 'react-router';

export default function CustomBreadcrumbs() {
  const { isLoading, isError, currentCategoryChain, categories } = useCategory();
  const [searchParameters, setSearchParameters] = useSearchParams();

  if (isLoading || isError) return null;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, categoryId: string) {
    event.preventDefault();
    const newParameters = new URLSearchParams(searchParameters);
    const category = categories.find((category) => category.id === categoryId);
    if (category && category.key) {
      newParameters.set('category', category.key);
    } else {
      newParameters.delete('category');
    }
    setSearchParameters(newParameters);
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
