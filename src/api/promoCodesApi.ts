import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey, apiUrl } from './constants';
import type { PromoCode } from '../types/promoCodesApi';

export const promoCodesApi = createApi({
  reducerPath: 'promoCodesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/${projectKey}`,
    prepareHeaders: async (headers) => {
      const accessToken = localStorage.getItem('auth_token');
      headers.set('Authorization', `Bearer ${accessToken}`);
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
