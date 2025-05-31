export type AddressApi = { streetName: string; city: string; country: string; postalCode: string };

export type AddressWithId = AddressApi & {
  id: string;
};

export type RegistrationDataApi = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressApi[];
  defaultShippingAddress?: number;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
};

export type CustomerFromApi = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressWithId[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
};
