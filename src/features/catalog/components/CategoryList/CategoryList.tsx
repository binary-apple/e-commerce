import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useCategory } from '../../../../contexts/CategoryContext';

export default function CategoryList() {
  const { selectedIndex, setselectedIndex, categories, isLoading, isError, currentCategoryChain } =
    useCategory();
  const handleListItemClick = (index: number) => {
    setselectedIndex(index);
  };
  if (isLoading || isError) {
    return null;
  }

  console.log(categories[selectedIndex]);
  console.log(currentCategoryChain);

  return (
    <Paper>
      <Typography
        component="h3"
        fontSize="1.4rem"
        padding="0.7rem"
        fontWeight={600}
        color="primary"
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
                sx={{ paddingLeft: `calc(1.5rem * ${category.nestingLevel})` }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
