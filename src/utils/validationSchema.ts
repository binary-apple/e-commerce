import * as yup from 'yup';
import { checkAge } from './checkAge';

const PASSWORD_LENGTH = 8;

const emailSchema = yup
  .string()
  .required('Email is required')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'Invalid email format',
    excludeEmptyString: true,
  });

const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(PASSWORD_LENGTH, `Must be at least ${PASSWORD_LENGTH} characters long`)
  .matches(/[A-Z]/, 'Must include at least one uppercase Latin letter')
  .matches(/[a-z]/, 'Must include at least one lowercase Latin letter')
  .matches(/\d/, 'Must include at least one number');

export const registrationSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'Only Latin letters are allowed'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Only Latin letters are allowed'),
  dob: yup
    .string()
    .typeError('Invalid date')
    .required('Date of birth is required')
    .test('age', 'You must be at least 18 years old', (value) => {
      if (!value) return false;
      return checkAge(new Date(value));
    }),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  postalCode: yup
    .string()
    .required('Postal code is required')
    .matches(/^(\d{5}|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/, 'Invalid postal code format'),
  country: yup.string().required('Country is required'),
});
