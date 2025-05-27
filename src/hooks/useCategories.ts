import { useMemo } from 'react';
import { useGetAllCategoriesQuery } from '../api/productsApi';
import type { FlatCategory } from '../types/categories';
import type { Category } from '../types/productsApi';

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

export function useCategories() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const flatCategories = useMemo(() => {
    if (!data) return [];
    return flattenCategories(data.results);
  }, [data]);

  return {
    categories: flatCategories,
    isLoading,
    isError,
  };
}
