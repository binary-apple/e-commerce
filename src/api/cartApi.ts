import { createApi } from '@reduxjs/toolkit/query/react';
import type { Cart, LineItemDraft } from '../types/cartApi';
import { isCartListResponse, isCart } from '../types/cartApiGuards';
import { baseQueryForRefreshFlow } from './helpers/baseQueryWithReauth';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryForRefreshFlow,
  tagTypes: ['Cart'],
  endpoints: (build) => ({
    getMyActiveCart: build.query<Cart, void>({
      async queryFn(_arguments, _api, _extraOptions, fetchWithBQ) {
        console.log('Fetching active cart');
        const carts = await fetchWithBQ('me/carts');
        console.log('Carts response:', carts);
        if (carts.error) return { error: carts.error };
        if (isCartListResponse(carts.data) && carts.data.results.length === 0) {
          console.log('Creating active cart');

          await fetchWithBQ({
            url: 'me/carts',
            method: 'POST',
            body: {
              currency: 'EUR',
            },
          });
        }
        const activeCart = await fetchWithBQ('me/active-cart');
        if (activeCart.error) return { error: activeCart.error };
        if (!isCart(activeCart.data)) {
          return {
            error: { status: 500, data: 'Invalid cart data structure' },
          };
        }
        return { data: activeCart.data };
      },
      providesTags: ['Cart'],
    }),
    addLineItem: build.mutation<Cart, { cartId: string; version: number; draft: LineItemDraft }>({
      query: ({ cartId, version, draft }) => ({
        url: `me/carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [{ action: 'addLineItem', ...draft }],
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeLineItem: build.mutation<Cart, { cartId: string; version: number; lineItemId: string }>({
      query: ({ cartId, version, lineItemId }) => ({
        url: `me/carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [{ action: 'removeLineItem', lineItemId }],
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    changeLineItemQuantity: build.mutation<
      Cart,
      {
        cartId: string;
        version: number;
        lineItemId: string;
        quantity: number;
      }
    >({
      query: ({ cartId, version, lineItemId, quantity }) => ({
        url: `me/carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity,
            },
          ],
        },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetMyActiveCartQuery,
  useAddLineItemMutation,
  useRemoveLineItemMutation,
  useChangeLineItemQuantityMutation,
} = cartApi;
