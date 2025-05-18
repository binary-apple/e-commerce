export const enum ResponseCodes {
  BAD_REQUEST = 400,
  CONFLICT = 409,
}

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
export const apiUrl = import.meta.env.VITE_CTP_API_URL;
export const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
export const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
