import type { FieldProps } from './types/form';

export const ADDRESS_FIELDS: FieldProps[] = [
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
