export async function loginCustomer(email: string, password: string): Promise<string> {
  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', email);
  body.append('password', password);
  body.append('scope', `manage_customers:${import.meta.env.VITE_CTP_PROJECT_KEY}`);

  const result = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/token`,
    {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          btoa(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    },
  );

  if (!result.ok) throw new Error('Invalid login');

  const data = await result.json();
  return data.access_token;
}
