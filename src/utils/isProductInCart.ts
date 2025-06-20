import type { Cart } from '../types/cartApi';

export function isProductInCart(productId: string, cart?: Cart): boolean {
  return cart ? cart.lineItems.some((item) => item.productId === productId) : false;
}
