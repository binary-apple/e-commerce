import { getClientToken } from '../services/serviceToken';
import type { RegistrationDataApi } from '../types/auth';
import { ApiError } from '../utils/ApiError';
import { responseCodes } from './constants';

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

  const responseBody = await response.json();

  if (!response.ok) {
    if (
      response.status === responseCodes.error400 &&
      responseBody?.errors?.[0]?.code === 'DuplicateField'
    ) {
      throw new ApiError(responseCodes.error409, responseBody.message || 'Email already exists.');
    }

    throw new ApiError(response.status, responseBody.message || 'Failed to create customer.');
  }
  return responseBody;
}
