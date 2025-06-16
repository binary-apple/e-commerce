import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl, projectKey } from './helpers/constants';
import type { UpdateUserRequest, UpdateUserResponse } from '../types/userApi';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    update: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      async queryFn({ version, actions, accessToken }) {
        try {
          const response = await fetch(`${apiUrl}/${projectKey}/me`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              version,
              actions,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: data.message || 'Update failed',
              },
            };
          }

          return { data };
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
    changePassword: builder.mutation<
      void,
      { version: number; currentPassword: string; newPassword: string; accessToken: string }
    >({
      async queryFn({ version, currentPassword, newPassword, accessToken }) {
        try {
          const response = await fetch(`${apiUrl}/${projectKey}/me/password`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ version, currentPassword, newPassword }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            return {
              error: {
                status: response.status,
                data: errorData.message || 'Password change failed',
              },
            };
          }

          return { data: undefined };
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

export const { useUpdateMutation, useChangePasswordMutation } = userApi;
