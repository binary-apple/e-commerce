import { enqueueSnackbar } from 'notistack';
import { useAddLineItemMutation } from '../api/cartApi';
import { isProductInCart } from '../utils/isProductInCart';
import type { Cart } from '../types/cartApi';

export const useAddToCart = (cart?: Cart) => {
  const addItem = useAddLineItemMutation()[0];

  const handleAddToCart = async (id: string) => {
    if (!cart) return;
    const { data: updatedCart } = await addItem({
      cartId: cart.id,
      version: cart.version,
      draft: { productId: id },
    });
    if (isProductInCart(id, updatedCart)) {
      enqueueSnackbar('Product is added to your cart', { variant: 'success' });
    }
  };
  return handleAddToCart;
};
