import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey, apiUrl } from './constants';
import type { Cart, LineItemDraft } from '../types/cartApi';
import type { Response } from '../types/productsApi';

function isCartListResponse(data: unknown): data is Response<Cart> {
  return (
    typeof data === 'object' && data !== null && 'results' in data && Array.isArray(data.results)
  );
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/${projectKey}`,
    prepareHeaders: async (headers) => {
      //todo: handle token of anonymous or customer user when this will implemented
      const accessToken = localStorage.getItem('auth_token');
      headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (build) => ({
    getMyCarts: build.query<Cart[], void>({
      query: () => 'me/carts',
      async transformResponse(response: Response<Cart>) {
        return response.results;
      },
      providesTags: ['Cart'],
    }),

    getMyActiveCart: build.query({
      async queryFn(_arguments, _api, _extraOptions, fetchWithBQ) {
        const carts = await fetchWithBQ('me/carts');
        if (carts.error) return { error: carts.error };
        if (isCartListResponse(carts.data) && carts.data.results.length === 0) {
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
        return { data: activeCart };
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
  }),
});

export const {
  useGetMyCartsQuery,
  useGetMyActiveCartQuery,
  useAddLineItemMutation,
  useRemoveLineItemMutation,
} = cartApi;
