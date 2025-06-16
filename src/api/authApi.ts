import { createApi } from '@reduxjs/toolkit/query/react';
import type { CustomerFromApi, LoginResponse, RegistrationDataApi } from '../types/auth';
import {
  authApiUrl,
  apiUrl,
  clientId,
  clientSecret,
  projectKey,
  ResponseCodes,
} from './helpers/constants';
import { getClientToken } from '../services/serviceToken';
import { baseQueryForRefreshFlow } from './helpers/baseQueryWithReauth';

type OAuthError = {
  error?: string;
  error_description?: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryForRefreshFlow,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: `${authApiUrl}/oauth/${projectKey}/customers/token`,
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: email,
          password,
        }).toString(),
      }),
      transformErrorResponse: (error: { status: number; data: OAuthError }) => {
        return {
          status: error.status,
          data:
            typeof error.data === 'string'
              ? error.data
              : error.data?.error_description || 'Login failed',
        };
      },
    }),
    getAnonymousSession: builder.query<LoginResponse, void>({
      query: () => ({
        url: `${authApiUrl}/oauth/${projectKey}/anonymous/token`,
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }).toString(),
      }),
      transformErrorResponse: (error: { status: number; data: OAuthError }) => ({
        status: error.status,
        data:
          typeof error.data === 'string'
            ? error.data
            : error.data?.error_description || 'Anonymous session failed',
      }),
    }),

    getMe: builder.query<CustomerFromApi, string>({
      queryFn: async (accessToken) => {
        const result = await fetch(`${apiUrl}/${projectKey}/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!result.ok) return { error: await result.json() };
        const data = await result.json();
        return { data };
      },
    }),

    register: builder.mutation<unknown, RegistrationDataApi>({
      async queryFn(data) {
        try {
          const token = await getClientToken();

          const response = await fetch(`${apiUrl}/${projectKey}/customers`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const responseBody = await response.json();

          if (!response.ok) {
            if (
              response.status === ResponseCodes.BAD_REQUEST &&
              responseBody?.errors?.[0]?.code === 'DuplicateField'
            ) {
              return {
                error: {
                  status: ResponseCodes.CONFLICT,
                  data: responseBody.message || 'Email already exists.',
                },
              };
            }

            return {
              error: {
                status: response.status,
                data: responseBody.message || 'Failed to create customer.',
              },
            };
          }

          return { data: responseBody };
        } catch (error: unknown) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAnonymousSessionQuery,
  useLazyGetMeQuery,
  useRegisterMutation,
} = authApi;
