import { useMemo, useState } from 'react';
import type { FlatCategory } from '../types/categories';
import type { Category } from '../types/productsApi';
import { useGetAllCategoriesQuery } from '../api/productsApi';
import { CategoryContext } from '../contexts/CategoryContext';

function flattenCategories(categories: Category[]): FlatCategory[] {
  const flatCategories: { id: string; categoryName: string; nestingLevel: number }[] = [];
  const map = new Map<
    string,
    { name: string; children: { id: string; name: string }[]; parent: string | undefined }
  >();
  map.set('root', { name: 'All products', children: [], parent: undefined });
  categories.forEach((category) => {
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
    flatCategories.push({
      categoryName: categoryNode.name,
      nestingLevel: currentNestingLevel,
      id: id,
    });
    categoryNode.children.forEach((child) => treeTraversal(child.id, currentNestingLevel + 1));
  };
  treeTraversal('root', 0);
  return flatCategories;
}

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedIndex, setselectedIndex] = useState<number>(0);
  const { data, isLoading, isError } = useGetAllCategoriesQuery();

  const flatCategories = useMemo(() => {
    if (!data) return [];
    return flattenCategories(data.results);
  }, [data]);

  const currentCategoryChain: FlatCategory[] = [];

  if (flatCategories[selectedIndex]) {
    currentCategoryChain.push(flatCategories[selectedIndex]);
    let currentNestingLevel = flatCategories[selectedIndex].nestingLevel;
    let currentCategoryIndex = selectedIndex;
    while (currentNestingLevel > 0) {
      const previousCategoryIndex = flatCategories.findLastIndex(
        (category, id) =>
          category.nestingLevel === currentNestingLevel - 1 && id < currentCategoryIndex,
      );
      currentCategoryChain.unshift(flatCategories[previousCategoryIndex]);
      currentNestingLevel--;
      currentCategoryIndex = previousCategoryIndex;
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        selectedIndex,
        setselectedIndex,
        categories: flatCategories,
        isLoading,
        isError,
        currentCategoryChain,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
