import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useCategory } from '../../../../contexts/CategoryContext';

export default function CategoryList() {
  const { selectedIndex, setselectedIndex, categories, isLoading, isError } = useCategory();
  const handleListItemClick = (index: number) => {
    setselectedIndex(index);
  };
  if (isLoading || isError) {
    return null;
  }

  return (
    <Paper>
      <Typography
        component="h3"
        fontSize="1.4rem"
        padding="0.7rem"
        fontWeight={600}
        color="primary"
        sx={{ fontSize: { sm: '1.4rem', xs: '1rem' }, px: { sm: 1, xs: 0.5 } }}
      >
        Categories
      </Typography>
      <List>
        {categories.map((category, id) => {
          return (
            <ListItemButton
              key={id}
              sx={{ py: 0 }}
              selected={selectedIndex === id}
              onClick={() => handleListItemClick(id)}
            >
              <ListItemText
                primary={category.categoryName}
                sx={{
                  paddingLeft: {
                    md: `calc(1.5rem * ${category.nestingLevel})`,
                    xs: `calc(0.5rem * ${category.nestingLevel})`,
                  },
                  fontSize: {
                    md: '1rem',
                    xs: '0.75rem',
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
