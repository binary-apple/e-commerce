import Paper from '@mui/material/Paper';
// import { useGetAllCategoriesQuery } from '../../../../api/productsApi';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useCategories } from '../../../../hooks/useCategories';

export default function CategoryList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (
    // event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const { categories, isLoading, isError } = useCategories();
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
              onClick={(/* event */) => handleListItemClick(/* event, */ id)}
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
