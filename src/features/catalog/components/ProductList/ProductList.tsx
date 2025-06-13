import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useGetProductsQuery } from '../../../../api/productsApi';
import type { Product } from '../../../../types/productsApi';
import ProductCard from '../productCard/ProductCard.tsx';
import { useCategory } from '../../../../contexts/CategoryContext.tsx';
import type { SortValues } from '../../types/sort.ts';
import formatDataForSticker from '../../../../utils/formatDataForSticker/formatDataForSticker.ts';
import { Typography } from '@mui/material';
import { useAddLineItemMutation, useGetMyActiveCartQuery } from '../../../../api/cartApi.ts';

export default function ProductList({
  sortValue,
  searchValue,
  petType,
  selectedPriceRange: priceRange,
}: {
  sortValue: SortValues;
  searchValue: string;
  petType: string[];
  selectedPriceRange: number[];
}) {
  const {
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    selectedCategory,
  } = useCategory();

  const {
    data,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductsQuery({
    categoryId: selectedCategory?.id,
    sortOption: sortValue,
    searchOption: searchValue,
    petType: petType,
    selectedPriceRange: priceRange,
  });

  const addItem = useAddLineItemMutation()[0];
  const { data: cart } = useGetMyActiveCartQuery();
  const handleAddToCart = (id: string) => {
    if (!cart) return;
    addItem({ cartId: cart.id, version: cart.version, draft: { productId: id } });
    // console.log(cart);
  };

  if (isCategoryLoading || isProductLoading) {
    return <CircularProgress size="3rem" />;
  }
  if (isProductError || isCategoryError) {
    return <Typography>Something went wrong, please try again</Typography>;
  }
  return (
    <Grid container spacing={1}>
      {data?.results.length === 0 && <Typography>Nothing was found...</Typography>}
      {data?.results.map((product: Product) => {
        return (
          <ProductCard
            key={product.id}
            product={formatDataForSticker(product)}
            handleAddToCart={() => handleAddToCart(product.id)}
          />
        );
      })}
    </Grid>
  );
}
