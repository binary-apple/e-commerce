import Paper from '@mui/material/Paper';
import { useGetAllCategoriesQuery } from '../../../../api/productsApi';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

export default function CategoryList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (
    // event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const { data, isLoading } = useGetAllCategoriesQuery();
  if (isLoading) {
    return null;
  }
  const categories: { id: string; categoryName: string; nestingLevel: number }[] = [];
  const map = new Map<
    string,
    { name: string; children: { id: string; name: string }[]; parent: string | undefined }
  >();
  map.set('root', { name: 'All products', children: [], parent: undefined });
  data?.results.forEach((category) => {
    map.set(category.id, {
      name: category.name['en-GB'],
      children: [],
      parent: category.parent ? category.parent?.id : 'root',
    });
  });
  map.forEach((categoryNode, key) => {
    if (categoryNode.parent) {
      map.get(categoryNode.parent)?.children.push({ id: key, name: categoryNode.name });
    }
  });
  const treeTraversal = (id: string, currentNestingLevel: number) => {
    const categoryNode = map.get(id);
    if (!categoryNode) return;
    categories.push({ categoryName: categoryNode.name, nestingLevel: currentNestingLevel, id: id });
    categoryNode.children.forEach((child) => treeTraversal(child.id, currentNestingLevel + 1));
  };
  treeTraversal('root', 0);

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
