import type { Response } from './productsApi';

export default function isCartListResponse(data: unknown): data is Response<Cart> {
  return (
    typeof data === 'object' && data !== null && 'results' in data && Array.isArray(data.results)
  );
}

export default function isCart(data: unknown): data is Cart {
  if (typeof data !== 'object' || data === null) return false;
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    typeof data.id === 'string' &&
    'version' in data &&
    typeof data.version === 'number' &&
    'lineItems' in data &&
    Array.isArray(data.lineItems)
  );
}
