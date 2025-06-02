import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl, projectKey } from './constants';

type UserAction = {
  [key: string]: string;
  action: string;
};

type UpdateUserRequest = {
  version: number;
  actions: Array<UserAction>;
  accessToken: string;
};

type UpdateUserResponse = {
  id: string;
  version: number;
};

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
  }),
});

export const { useUpdateMutation } = userApi;
