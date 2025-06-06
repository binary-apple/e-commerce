import { describe, it, expect } from 'vitest';
import formatDataForSticker from './formatDataForSticker';
import { AttributeName, type Product } from '../../types/productsApi';

describe('formatDate', () => {
  const product: Product = {
    id: '123',
    version: 1,
    name: { 'en-GB': 'product' },
    description: { 'en-GB': 'The best product' },
    slug: { 'en-GB': 'slug' },
    metaTitle: { 'en-GB': 'meta title' },
    masterVariant: {
      id: 1,
      sku: 'sku',
      key: 'key',
      images: [
        {
          url: 'test/image.jpg',
          label: 'product image',
          dimensions: { h: 100, w: 100 },
        },
      ],
      prices: [
        {
          id: 'priceId',
          key: 'price',
          value: {
            centAmount: 1234,
            currencyCode: 'EUR',
            fractionDigits: 2,
            type: 'price type',
          },
        },
      ],

      attributes: [
        {
          name: AttributeName.Color,
          value: { key: 'color-cheap', label: 'color-cheap' },
        },
      ],
    },
    hasStagedChanges: true,
    published: true,
    key: 'product-123',
  };
  it('formatDataForSticker should correct format data:', () => {
    const result = formatDataForSticker(product);
    expect(result).toEqual({
      key: 'product-123',
      name: 'product',
      price: '12.34',
      image: 'test/image.jpg',
      description: 'The best product',
      color: 'color-cheap',
      place: '',
      currencyCode: 'EUR',
    });
  });
});
