import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey, apiUrl, clientId, clientSecret, authApiUrl } from './constants';
import type { PromoCode } from '../types/promoCodesApi';
import { getCurrentToken, saveAnonymousToken } from '../utils/tokenManager';

export const promoCodesApi = createApi({
  reducerPath: 'promoCodesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/${projectKey}/`,
    prepareHeaders: async (headers) => {
      let accessToken = getCurrentToken();

      if (!accessToken) {
        try {
          const response = await fetch(`${authApiUrl}/oauth/${projectKey}/anonymous/token`, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'client_credentials',
              scope: `view_products:${projectKey} view_discount_codes:${projectKey} manage_my_orders:${projectKey}`,
            }),
          });

          if (response.ok) {
            const tokenData = await response.json();
            saveAnonymousToken(tokenData);
            accessToken = tokenData.access_token;
          }
        } catch {
          throw new Error('Failed to get anonymous token');
        }
      }

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['PromoCodes'],
  endpoints: (build) => ({
    getActivePromoCodes: build.query<PromoCode[], void>({
      query: () => ({
        url: 'discount-codes',
        params: {
          where: 'isActive=true',
          limit: 10,
          sort: 'createdAt desc',
        },
      }),
      transformResponse: (response: { results: PromoCode[] }) => response.results,
      providesTags: ['PromoCodes'],
    }),
  }),
});

export const { useGetActivePromoCodesQuery } = promoCodesApi;
