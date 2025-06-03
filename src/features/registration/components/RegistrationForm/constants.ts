import { ADDRESS_FIELDS } from '../../../../constants';
import type { FieldSection } from '../../../../types/form';

export const formData = {
  titleForm: 'Registration',
  titleButton: 'Sign Up',
};

export const fieldsConfig: FieldSection[] = [
  {
    section: 'Personal data',
    fields: [
      { id: 'email', label: 'Email', type: 'text' },
      { id: 'password', label: 'Password', type: 'password' },
      { id: 'firstName', label: 'First name' },
      { id: 'lastName', label: 'Last name' },
      { id: 'dateOfBirth', label: 'Date of birth', type: 'date' },
    ],
  },
  {
    section: 'Shipping Address',
    fields: ADDRESS_FIELDS,
  },
  {
    section: 'Billing Address',
    fields: [
      { id: 'streetNameBill', label: 'Street' },
      { id: 'cityBill', label: 'City' },
      {
        id: 'countryBill',
        label: 'Country',
        type: 'select',
        options: [
          { value: 'GB', label: 'United Kingdom' },
          { value: 'DE', label: 'Germany' },
          { value: 'IE', label: 'Ireland' },
        ],
      },
      { id: 'postalCodeBill', label: 'Postal code' },
    ],
  },
];
