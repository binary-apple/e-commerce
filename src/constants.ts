import type { AddressFieldProps } from './features/profile/types';

export const ADDRESS_FIELDS: AddressFieldProps[] = [
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
