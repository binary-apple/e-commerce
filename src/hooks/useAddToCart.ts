import { enqueueSnackbar } from 'notistack';
import { useAddLineItemMutation } from '../api/cartApi';
import { isProductInCart } from '../utils/isProductInCart';
import type { Cart } from '../types/cartApi';

export const useAddToCart = (cart?: Cart) => {
  const [addItem, { isLoading }] = useAddLineItemMutation();

  const handleAddToCart = async (id: string) => {
    try {
      if (!cart) return;
      const updatedCart = await addItem({
        cartId: cart.id,
        version: cart.version,
        draft: { productId: id },
      }).unwrap();
      if (isProductInCart(id, updatedCart)) {
        enqueueSnackbar('Sticker is added to your cart', { variant: 'success' });
      }
    } catch {
      enqueueSnackbar('Failed to add sticker to cart', { variant: 'error' });
      throw new Error('Failed to add sticker to cart');
    }
  };
  return { addToCart: handleAddToCart, isLoading };
};
