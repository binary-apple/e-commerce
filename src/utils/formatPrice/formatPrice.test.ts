import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatPrice';
import type { PriceValue } from '../../types/productsApi';

describe('formatPrice', () => {
  it('formatPrice should return formatted price:', () => {
    const price: PriceValue = {
      centAmount: 12345,
      currencyCode: 'EUR',
      fractionDigits: 2,
      type: '',
    };
    expect(formatPrice(price)).toBe('123.45');
  });

  it('formatPrice should format zero:', () => {
    const price: PriceValue = {
      centAmount: 0,
      currencyCode: 'EUR',
      fractionDigits: 2,
      type: '',
    };
    expect(formatPrice(price)).toBe('0.00');
  });

  it('formatPrice should format with one fraction digits:', () => {
    const price: PriceValue = {
      centAmount: 12345,
      currencyCode: 'EUR',
      fractionDigits: 1,
      type: '',
    };
    expect(formatPrice(price)).toBe('123.5');
  });

  it('formatPrice should format with no fraction digits:', () => {
    const price: PriceValue = {
      centAmount: 12345,
      currencyCode: 'EUR',
      fractionDigits: 0,
      type: '',
    };
    expect(formatPrice(price)).toBe('123');
  });
});
