import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { ResponseCodes, apiUrl, authApiUrl, clientId, clientSecret, projectKey } from './constants';
import { isAccessTokenResponse } from './isAccessTokenResp';
import { getAuthTokenFromLS, getRefreshTokenFromLS } from '../../hooks/useAuth';

const baseFetch = fetchBaseQuery({
  baseUrl: `${apiUrl}/${projectKey}`,
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
  console.log('Base query result:', result);
  if (result.error?.status === ResponseCodes.UNAUTHORISED) {
    if (!getAuthTokenFromLS()) {
      return {
        error: {
          status: ResponseCodes.UNAUTHORISED,
          data: 'No auth token found',
        },
      };
    }
    if (isRefreshing) {
      requestsQueue.push({ queryArgs: [queryArguments, api, extra] });
    }

    isRefreshing = true;

    const refreshToken = getRefreshTokenFromLS();

    console.log('Refreshing token with refresh token:', refreshToken);
    const body = new URLSearchParams();
    if (!refreshToken) {
      return {
        error: {
          status: ResponseCodes.UNAUTHORISED,
          data: 'No refresh token found',
        },
      };
    }
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken);

    const refreshResult = await baseFetch(
      {
        url: `${authApiUrl}/oauth/token`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        body: body.toString(),
        // body: new URLSearchParams({
        //   grant_type: 'refresh_token',
        //   refresh_token: refreshToken,
        // }).toString(),
      },
      api,
      extra,
    );

    if ('error' in refreshResult) {
      //Todo: handle error
      isRefreshing = false;
      return refreshResult;
    } else {
      const requestRespData = refreshResult.data;

      if (isAccessTokenResponse(requestRespData)) {
        localStorage.setItem('auth_token', requestRespData.access_token);
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
//       const accessToken = localStorage.getItem('auth_token');
//       queryArguments = {
//         ...queryArguments,
//         headers: { ...queryArguments.headers, Authorization: `bearer ${accessToken}` },
//       };
//     }
//     await baseQueryForRefreshFlow(queryArguments, ...restArguments);
//   });
// }
