import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey, apiUrl } from './constants';
import type { Cart, LineItemDraft } from '../types/cartApi';
import type { Response } from '../types/productsApi';

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

    // Todo: replace method under commet to RTK Query methods!
    // getMyActiveCart: build.query<Cart, void>({
    //   async queryFn(_arguments, _api, _extraOptions, fetchWithBQ) {
    //     const carts = await fetchWithBQ('me/carts');
    //     if (carts.error) return { error: carts.error as FetchBaseQueryError };
    //     const fetchedCarts = carts.data as Response<Cart[]>;
    //     if (fetchedCarts.results.length === 0) {
    //       await fetchWithBQ({
    //         url: 'me/carts',
    //         method: 'POST',
    //         body: {
    //           currency: 'EUR',
    //         },
    //       });
    //       const activeCart = await fetchWithBQ('me/active-cart');
    //       return activeCart.data ? { data: activeCart.data } : { error: activeCart.error };
    //     }
    //     const activeCart = await fetchWithBQ('me/active-cart');
    //     return activeCart.data ? { data: activeCart.data } : { error: activeCart.error };
    //   },
    //   providesTags: ['Cart'],
    // }),
    getMyActiveCart: build.query<Cart, void>({
      queryFn: async () => {
        const cartsResponse = await fetch(`${apiUrl}/${projectKey}/me/carts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const responseData: Response<Cart> = await cartsResponse.json();

        if (!cartsResponse.ok) {
          return { error: { status: cartsResponse.status, data: responseData } };
        }

        if (responseData.results.length === 0) {
          await fetch(`${apiUrl}/${projectKey}/me/carts`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              currency: 'EUR',
            }),
          });
        }
        const activeCartResponse = await fetch(`${apiUrl}/${projectKey}/me/active-cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const activeCartData = await activeCartResponse.json();
        if (!activeCartResponse.ok) {
          return { error: { status: activeCartResponse.status, data: activeCartData } };
        }
        return { data: activeCartData };
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
