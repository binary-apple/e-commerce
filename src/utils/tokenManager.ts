export type TokenData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  scope: string;
};

export type AnonymousTokenData = {
  anonymous_id?: string;
} & TokenData;

export const TOKEN_STORAGE_KEYS = {
  USER_TOKEN: 'auth_token',
  ANONYMOUS_TOKEN: 'anonymous_token',
  ANONYMOUS_ID: 'anonymous_id',
} as const;

const MS_IN_SECOND = 1000;
const SEC_IN_MIN = 1000;
const MINUTES = 5;
const TOKEN_EXPIRATION_BUFFER_MS = MINUTES * SEC_IN_MIN * MS_IN_SECOND;

export function isTokenValid(tokenData: TokenData | null): boolean {
  if (!tokenData) return false;

  const now = Date.now();
  const expiresAt = tokenData.expires_at || now + tokenData.expires_in * MS_IN_SECOND;

  return expiresAt > now + TOKEN_EXPIRATION_BUFFER_MS;
}

export function getCurrentToken(): string | null {
  const userToken = getUserToken();
  if (userToken && isTokenValid(userToken)) {
    return userToken.access_token;
  }

  const anonymousToken = getAnonymousToken();
  if (anonymousToken && isTokenValid(anonymousToken)) {
    return anonymousToken.access_token;
  }

  return null;
}

export function getUserToken(): TokenData | null {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEYS.USER_TOKEN);
    return token ? JSON.parse(token) : null;
  } catch {
    return null;
  }
}

export function getAnonymousToken(): AnonymousTokenData | null {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEYS.ANONYMOUS_TOKEN);
    return token ? JSON.parse(token) : null;
  } catch {
    return null;
  }
}

export function saveUserToken(tokenData: TokenData): void {
  const tokenWithExpiry = {
    ...tokenData,
    expires_at: Date.now() + tokenData.expires_in * MS_IN_SECOND,
  };
  localStorage.setItem(TOKEN_STORAGE_KEYS.USER_TOKEN, JSON.stringify(tokenWithExpiry));
}

export function saveAnonymousToken(tokenData: AnonymousTokenData): void {
  const tokenWithExpiry = {
    ...tokenData,
    expires_at: Date.now() + tokenData.expires_in * MS_IN_SECOND,
  };
  localStorage.setItem(TOKEN_STORAGE_KEYS.ANONYMOUS_TOKEN, JSON.stringify(tokenWithExpiry));
}

export function clearUserToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEYS.USER_TOKEN);
}

export function clearAnonymousToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEYS.ANONYMOUS_TOKEN);
  localStorage.removeItem(TOKEN_STORAGE_KEYS.ANONYMOUS_ID);
}

export function isUserLoggedIn(): boolean {
  const userToken = getUserToken();
  return userToken !== null && isTokenValid(userToken);
}
