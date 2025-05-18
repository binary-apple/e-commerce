export type AddressApi = { streetName: string; city: string; country: string; postalCode: string };

export type RegistrationDataApi = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressApi[];
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
};
