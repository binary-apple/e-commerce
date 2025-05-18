import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginResponse, RegistrationDataApi } from '../types/auth';
import { apiUrl, clientId, clientSecret, projectKey, ResponseCodes } from './constants';
import { getClientToken } from '../services/serviceToken';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      async queryFn({ email, password }) {
        try {
          const response = await fetch(
            `https://auth.europe-west1.gcp.commercetools.com/oauth/${projectKey}/customers/token`,
            {
              method: 'POST',
              headers: {
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'password',
                username: email,
                password,
                scope: `manage_my_profile:${projectKey}`,
              }),
            },
          );

          const data = await response.json();

          if (!response.ok) {
            return {
              error: data.error_description || 'Login failed',
            };
          }

          return { data };
        } catch (error: unknown) {
          return { error: error instanceof Error ? error : new Error('Unknown error') };
        }
      },
    }),

    getMe: builder.query<{ email: string }, string>({
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

export const { useLoginMutation, useLazyGetMeQuery, useRegisterMutation } = authApi;
