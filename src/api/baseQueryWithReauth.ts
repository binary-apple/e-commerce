import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { baseAuthUrl, clientId, clientSecret, projectKey } from './constants';
import { isAccessTokenResponse } from './isAccessTokenResp';

const baseFetch = fetchBaseQuery({
  baseUrl: `https://api.europe-west1.gcp.commercetools.com/${projectKey}`,
});

let isRefreshing = false;

const requestsQueue: { queryArgs: Parameters<typeof baseFetch> }[] = [];

export const baseQueryForRefreshFlow: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (queryArguments, api, extra) => {
  let result = await baseFetch(queryArguments, api, extra);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (result.error?.status === 401) {
    if (isRefreshing) {
      requestsQueue.push({ queryArgs: [queryArguments, api, extra] });
    }

    isRefreshing = true;

    const refreshToken = localStorage.getItem('refresh_token') ?? '';

    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken);

    const refreshResult = await baseFetch(
      {
        url: `${baseAuthUrl}/oauth/token`,
        headers: {
          Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        body: body.toString(),
      },
      // эти аргументы я передаю просто потому что TS просит, они не нужны по факту
      api,
      extra,
    );

    if ('error' in refreshResult) {
      // обработать ошибку
      isRefreshing = false;
      return refreshResult;
    } else {
      // обработать результат

      const requestRespData = refreshResult.data;

      if (isAccessTokenResponse(requestRespData)) {
        localStorage.setItem('access_token', requestRespData.access_token);
        localStorage.setItem('refresh_token', requestRespData.refresh_token);
      }

      isRefreshing = false;
      // processQueue();
      result = await baseFetch(queryArguments, api, extra);
    }
  }

  return result;
};

// async function processQueue() {
//   requestsQueue.forEach(async (requestParameters) => {
//     let [queryArguments, ...restArguments] = requestParameters.queryArgs;

//     if (typeof queryArguments !== 'string') {
//       const accessToken = localStorage.getItem('access_token');
//       queryArguments = {
//         ...queryArguments,
//         headers: { ...queryArguments.headers, Authorization: `bearer ${accessToken}` },
//       };
//     }
//     await baseQueryForRefreshFlow(queryArguments, ...restArguments);
//   });
// }
