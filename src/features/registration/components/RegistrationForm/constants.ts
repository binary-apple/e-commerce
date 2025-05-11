import type { FieldSection } from '../../../../types/form';

export const formData = {
  titleForm: 'Registration',
  titleButton: 'Sign Up',
};

export const fieldsConfig: FieldSection[] = [
  {
    section: 'Personal data',
    fields: [
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'password', label: 'Password', type: 'password' },
      { id: 'firstName', label: 'First name' },
      { id: 'lastName', label: 'Last name' },
      { id: 'dob', label: 'Date of birth', type: 'date' },
    ],
  },
  {
    section: 'Address',
    fields: [
      { id: 'street', label: 'Street' },
      { id: 'city', label: 'City' },
      { id: 'postalCode', label: 'Postal code' },
      { id: 'country', label: 'Country' },
    ],
  },
];
