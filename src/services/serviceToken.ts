export async function getClientToken(): Promise<string> {
  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  body.append('scope', `manage_customers:${import.meta.env.VITE_CTP_PROJECT_KEY}`);

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
  return data.access_token;
}
