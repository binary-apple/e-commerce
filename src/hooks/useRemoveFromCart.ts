import { enqueueSnackbar } from 'notistack';
import { useRemoveLineItemMutation } from '../api/cartApi';
import { isProductInCart } from '../utils/isProductInCart';
import type { Cart } from '../types/cartApi';

export const useRemoveFromCart = (cart?: Cart) => {
  const [removeItem, { isLoading }] = useRemoveLineItemMutation();

  const removeFromCart = async (id: string) => {
    try {
      if (!cart) return;
      const lineItem = cart.lineItems.find((item) => item.productId === id);
      if (!lineItem?.id) return;
      const updatedCart = await removeItem({
        cartId: cart.id,
        version: cart.version,
        lineItemId: lineItem.id,
      }).unwrap();
      if (!isProductInCart(id, updatedCart)) {
        enqueueSnackbar('Sticker is removed from your cart', { variant: 'success' });
      }
    } catch {
      enqueueSnackbar('Failed to remove sticker from cart', { variant: 'error' });
      throw new Error('Failed to remove sticker from cart');
    }
  };
  return { removeFromCart, isLoading };
};
