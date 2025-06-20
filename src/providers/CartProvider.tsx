import { useGetMyActiveCartQuery } from '../api/cartApi';

export const CartProvider = () => {
  useGetMyActiveCartQuery();
  return null;
};
