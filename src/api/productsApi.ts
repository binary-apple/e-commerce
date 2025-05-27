import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey } from './constants';
import { getClientToken } from '../services/serviceToken';
import type { CategoriesResponse, ProductsResponse, Product } from '../types/productsApi';

const PRODUCTS_LIMIT = 100;
const OFFSET = 0;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.europe-west1.gcp.commercetools.com/${projectKey}`,
    prepareHeaders: async (headers) => {
      // TODO: get token only once in main
      const accessToken = await getClientToken('view_products');
      headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, { limit?: number; offset?: number }>({
      query: ({ limit = PRODUCTS_LIMIT, offset = OFFSET }) =>
        `/product-projections?limit=${limit}&offset=${offset}`,
    }),
    getAllCategories: build.query<CategoriesResponse, void>({
      query: () => '/categories',
    }),
    getProductByKey: build.query<Product, { key: string }>({
      query: ({ key }) => `/product-projections/key=${key}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetAllCategoriesQuery, useGetProductByKeyQuery } =
  productsApi;
