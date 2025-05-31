import type { Price } from '../types/productsApi.ts';

const CENTS_IN_EURO = 100;

export function formatPrice(price: Price): string {
  const { centAmount, fractionDigits } = price.value;
  const euroAmount = centAmount / CENTS_IN_EURO;
  return euroAmount.toFixed(fractionDigits);
}
