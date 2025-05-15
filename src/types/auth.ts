export type AddressApi = { streetName: string; city: string; country: string; postalCode: string };

export type RegistrationDataApi = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressApi[];
};
