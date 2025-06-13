import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectKey } from './constants';
import { getClientToken } from '../services/serviceToken';
import type { Response, Product, Category, ProductType } from '../types/productsApi';
import { CENTS_IN_EURO } from '../utils/formatPrice/formatPrice';

const PRODUCTS_LIMIT = 100;
const OFFSET = 0;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.europe-west1.gcp.commercetools.com/${projectKey}`,
    prepareHeaders: async (headers) => {
      const accessToken = await getClientToken();
      headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProducts: build.query<
      Response<Product>,
      {
        priceRange?: { from?: number; to?: number };
        selectedPriceRange?: number[];
        categoryId?: string;
        sortOption?: string;
        searchOption?: string;
        petType?: string[];
        limit?: number;
        offset?: number;
      }
    >({
      query: ({
        priceRange = {},
        selectedPriceRange = [],
        categoryId = 'root',
        sortOption = '',
        searchOption = '',
        petType = [],
        limit = PRODUCTS_LIMIT,
        offset = OFFSET,
      }) => {
        const searchParameters = [];
        if (
          (priceRange.from !== undefined && priceRange.from >= 0) ||
          (priceRange.to !== undefined && priceRange.to >= 0)
        ) {
          searchParameters.push(
            `facet=variants.price.centAmount:range(${priceRange.from ?? 0} to ${priceRange.to ?? '*'})`,
          );
        }
        if (
          selectedPriceRange &&
          selectedPriceRange.length > 0 &&
          (selectedPriceRange[0] !== 0 || selectedPriceRange[1] !== 0)
        ) {
          searchParameters.push(
            `filter.query=variants.price.centAmount:range(${selectedPriceRange[0] ? selectedPriceRange[0] * CENTS_IN_EURO : 0} to ${selectedPriceRange[1] ? selectedPriceRange[1] * CENTS_IN_EURO : '*'})`,
          );
        }
        if (petType.length > 0) {
          searchParameters.push(
            `filter=variants.attributes.pet-type.key:${petType.map((pet) => `"${pet.toLowerCase()}"`).join(',')}`,
          );
        }
        if (categoryId !== 'root' && categoryId) {
          searchParameters.push(`filter.query=categories.id:"${categoryId}"`);
        }
        if (sortOption) {
          searchParameters.push(`sort=${sortOption}`);
        }
        if (searchOption) {
          searchParameters.push(`text.en-GB=${searchOption}`);
        }
        searchParameters.push(`limit=${limit}`, `offset=${offset}`);
        const pathPrefix = 'product-projections/search';
        return `${pathPrefix}?${searchParameters.join('&')}`;
      },
    }),
    getAllCategories: build.query<Response<Category>, void>({
      query: () => '/categories',
    }),
    getProductTypes: build.query<Response<ProductType>, void>({
      query: () => '/product-types',
    }),
    getProductByKey: build.query<Product, { key: string }>({
      query: ({ key }) => `/product-projections/key=${key}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllCategoriesQuery,
  useGetProductByKeyQuery,
  useGetProductTypesQuery,
} = productsApi;
