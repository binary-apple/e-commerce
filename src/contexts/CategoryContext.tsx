import { createContext, useContext } from 'react';
import type { FlatCategory } from '../types/categories';

export const CategoryContext = createContext<{
  selectedIndex: number;
  setselectedIndex: (id: number) => void;
  selectedCategory: FlatCategory | null;
  categories: FlatCategory[];
  isLoading: boolean;
  isError: boolean;
  currentCategoryChain: FlatCategory[];
}>({
  selectedIndex: 0,
  setselectedIndex: () => {},
  selectedCategory: null,
  categories: [],
  isLoading: false,
  isError: false,
  currentCategoryChain: [],
});

export const useCategory = () => useContext(CategoryContext);
