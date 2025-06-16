import { getAuthTokenFromLS, saveAuthTokenToLS } from '../hooks/useAuth';

export async function getClientToken(): Promise<string> {
  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  // Apply all required scopes
  // Scopes are not required!
  // https://docs.commercetools.com/api/scopes
  // const scopes = ['view_products'];
  // body.append('scope', scopes.map((s) => `${s}:${import.meta.env.VITE_CTP_PROJECT_KEY}`).join(' '));

  const clientTokenLs = getAuthTokenFromLS();

  if (clientTokenLs) {
    return clientTokenLs;
  }

  const result = await fetch(`${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        btoa(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!result.ok) throw new Error('Cannot get service token');
  const data = await result.json();
  const clientToken = data.access_token;
  const refreshToken = data.refresh_token;
  saveAuthTokenToLS(clientToken, refreshToken);
  return clientToken;
}
