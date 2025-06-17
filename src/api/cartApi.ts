import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey, apiUrl, clientId, clientSecret, authApiUrl } from './constants';
import type { Cart, LineItemDraft } from '../types/cartApi';
import { isCartListResponse, isCart } from '../types/cartApiGuards';
import {
  getCurrentToken,
  saveAnonymousToken,
  type AnonymousTokenData,
} from '../utils/tokenManager';

async function getAnonymousTokenDirect(): Promise<string | null> {
  try {
    const response = await fetch(`${authApiUrl}/oauth/${projectKey}/anonymous/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        // scope: `manage_project:${projectKey} view_products:${projectKey} create_anonymous_token:${projectKey} manage_my_orders:${projectKey}`,
      }),
    });

    const data: AnonymousTokenData = await response.json();

    saveAnonymousToken(data);

    return data.access_token;
  } catch {
    return null;
  }
}

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `${apiUrl}/${projectKey}`,
  prepareHeaders: async (headers) => {
    let token = getCurrentToken();

    if (!token) {
      token = await getAnonymousTokenDirect();
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Cart'],
  endpoints: (build) => ({
    getMyActiveCart: build.query<Cart, void>({
      async queryFn(_arguments, _api, _extraOptions, fetchWithBQ) {
        try {
          const carts = await fetchWithBQ('me/carts');
          if (carts.error) {
            return { error: carts.error };
          }

          if (isCartListResponse(carts.data) && carts.data.results.length === 0) {
            const createResult = await fetchWithBQ({
              url: 'me/carts',
              method: 'POST',
              body: {
                currency: 'EUR',
              },
            });

            if (createResult.error) {
              return { error: createResult.error };
            }
          }

          // const activeCart = await fetchWithBQ('me/active-cart');
          const activeCart = await fetchWithBQ({
            url: 'me/active-cart',
            params: {
              expand: 'discountCodes[*].discountCode',
            },
          });

          if (activeCart.error) {
            return { error: activeCart.error };
          }

          if (!isCart(activeCart.data)) {
            return {
              error: { status: 500, data: 'Invalid cart data structure' },
            };
          }

          return { data: activeCart.data };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unexpected error',
            },
          };
        }
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
    addDiscountCode: build.mutation<
      Cart,
      {
        cartId: string;
        version: number;
        code: string;
      }
    >({
      query: ({ cartId, version, code }) => ({
        url: `me/carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code: code.trim().toUpperCase(),
            },
          ],
        },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeDiscountCode: build.mutation<
      Cart,
      {
        cartId: string;
        version: number;
        discountCodeId: string;
      }
    >({
      query: ({ cartId, version, discountCodeId }) => ({
        url: `me/carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'removeDiscountCode',
              discountCode: {
                typeId: 'discount-code',
                id: discountCodeId,
              },
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
  useAddDiscountCodeMutation,
  useRemoveDiscountCodeMutation,
} = cartApi;
