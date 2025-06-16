export function isAccessTokenResponse(
  data: unknown,
): data is { access_token: string; refresh_token: string } {
  return (
    typeof data == 'object' && data !== null && 'access_token' in data && 'refresh_token' in data
  );
}
