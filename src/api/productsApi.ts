import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey } from './constants';
import { getClientToken } from '../services/serviceToken';
import type { ProductsResponse } from '../types/productsApi';

const PRODUCTS_LIMIT = 100;
const OFFSET = 0;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.europe-west1.gcp.commercetools.com/${projectKey}`,
    prepareHeaders: async (headers) => {
      const assessToken = await getClientToken('view_products');
      headers.set('Authorization', `Bearer ${assessToken}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, { limit?: number; offset?: number }>({
      query: ({ limit = PRODUCTS_LIMIT, offset = OFFSET }) =>
        `/products?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
