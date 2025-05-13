import { getClientToken } from '../services/serviceToken';
import type { RegistrationDataApi } from '../types/auth';

export async function createCustomer(data: RegistrationDataApi) {
  const token = await getClientToken();

  const response = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) throw new Error('Failed to create customer');
  return await response.json();
}
