import type { PriceValue } from '../../types/productsApi.ts';

export const CENTS_IN_EURO = 100;

export function formatPrice(price: PriceValue): string {
  const { centAmount, fractionDigits } = price;
  const euroAmount = centAmount / CENTS_IN_EURO;
  return euroAmount.toFixed(fractionDigits);
}
