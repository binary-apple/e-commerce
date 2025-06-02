import type { FieldsProfileProps, FieldsProfileSection } from './types';

export const pageData = {
  titleForm: 'User Profile',
};

// TODO
// const passwordFields: FieldProps[] = [
//   { id: 'password', label: 'Old Password', type: 'password' },
//   { id: 'password-new', label: 'New Password', type: 'password' },
// ];

export const addressFields: FieldsProfileProps[] = [
  { id: 'streetName', label: 'Street' },
  { id: 'city', label: 'City' },
  {
    id: 'country',
    label: 'Country',
    type: 'select',
    options: [
      { value: 'GB', label: 'United Kingdom' },
      { value: 'DE', label: 'Germany' },
      { value: 'IE', label: 'Ireland' },
    ],
  },
  { id: 'postalCode', label: 'Postal code' },
];

export const fieldsConfig: FieldsProfileSection[] = [
  {
    section: 'Personal data',
    fields: [
      { id: 'email', label: 'Email', type: 'text' },
      { id: 'dateOfBirth', label: 'Date of birth', type: 'date' },
      { id: 'firstName', label: 'First name' },
      { id: 'lastName', label: 'Last name' },
    ],
  },
  {
    section: 'Shipping Address',
    addressType: 'shipping',
    fields: addressFields,
  },
  {
    section: 'Billing Address',
    addressType: 'billing',
    fields: addressFields,
  },
];

export const countryMap: Record<string, string> = {
  DE: 'Germany',
  GB: 'United Kingdom',
  IE: 'Ireland',
};
