import type { PriceValue } from '../../types/productsApi.ts';

export const CENTS_IN_EURO = 100;
const DECIMAL_BASE = 10;

export function formatPrice(price: PriceValue): string {
  const { centAmount, fractionDigits } = price;
  const euroAmount = centAmount / CENTS_IN_EURO;
  return euroAmount.toFixed(fractionDigits);
}

export function sumFormatPrice(firstPrice: PriceValue, secondPrice: PriceValue): string {
  const { centAmount: firstCents, fractionDigits: firstDigits } = firstPrice;
  const { centAmount: secondCents, fractionDigits: secondDigits } = secondPrice;

  const maxFractionDigits = Math.max(firstDigits, secondDigits);
  const scaleFactor = DECIMAL_BASE ** maxFractionDigits;

  const totalCents = firstCents * scaleFactor + secondCents * scaleFactor;

  const totalEuro = (totalCents / (CENTS_IN_EURO * scaleFactor)).toFixed(maxFractionDigits);

  return totalEuro;
}
