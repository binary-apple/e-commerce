import * as yup from 'yup';
import { checkAge } from './checkAge';

const PASSWORD_LENGTH = 8;

const emailSchema = yup
  .string()
  .test(
    'no-trim-spaces',
    'Email must not contain leading or trailing whitespace.',
    (value) => value === value?.trim(),
  )
  .required('Email is required')
  .matches(/^[\w%+.-]+@([\dA-Za-z-]+\.)+[A-Za-z]{2,}$/, {
    message: 'Invalid email format',
    excludeEmptyString: true,
  });

const passwordSchema = yup
  .string()
  .required('Password is required')
  .test(
    'no-trim-spaces',
    'Password must not contain leading or trailing whitespace.',
    (value) => value === value?.trim(),
  )
  .min(PASSWORD_LENGTH, `Must be at least ${PASSWORD_LENGTH} characters long`)
  .matches(/[A-Z]/, 'Must include at least one uppercase Latin letter')
  .matches(/[a-z]/, 'Must include at least one lowercase Latin letter')
  .matches(/\d/, 'Must include at least one number');

// TODO ??? I don't know: how we can use addressSchema in validations registrationSchema
// const addressSchema = yup.object({
//   street: yup
//     .string()
//     .required('Street is required')
//     .matches(/^[\d './A-Z[^a-z-]+$/, {
//       message: "Only Latin letters, numbers, dots, ', - and spaces allowed",
//     }),
//   city: yup
//     .string()
//     .required('City is required')
//     .matches(/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/, {
//       message: 'Only Latin letters, single spaces and hyphens allowed',
//     }),
//   country: yup.string().required('Country is required'),
//   postalCode: yup
//     .string()
//     .required('Postal code is required')
//     .test('is-valid-postal-code', 'Invalid postal code format', function (value) {
//       const { country } = this.parent;
//       const regex = postalCodeRegexMap[country];
//       if (!regex) return true;
//       return regex.test(value || '');
//     }),
// });

const postalCodeRegexMap: Record<string, RegExp> = {
  GB: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}$/,
  DE: /^\d{5}$/,
  IE: /^[A-Z]\d{2}\s?[\dA-Z]{4}$/,
};

export const registrationSchema = yup.object().shape({
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
  street: yup
    .string()
    .required('Street is required')
    .matches(/^[\d './A-Z[^a-z-]+$/, {
      message: "Only Latin letters, numbers, dots, ', - and spaces allowed",
      excludeEmptyString: true,
    }),
  city: yup
    .string()
    .required('City is required')
    .trim()
    .matches(/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/, {
      message: 'Only Latin letters, single spaces and hyphens allowed',
      excludeEmptyString: true,
    }),
  country: yup.string().required('Country is required'),
  postalCode: yup
    .string()
    .required('Postal code is required')
    .test('is-valid-postal-code', 'Invalid postal code format', function (value) {
      const { country } = this.parent;
      const regex = postalCodeRegexMap[country];
      if (!regex) return true;
      return regex.test(value || '');
    }),

  isBilling: yup.boolean().required(),

  streetBill: yup.string().when('isBilling', ([isBilling], schema) => {
    if (isBilling === false) {
      return schema.required('Street is required').matches(/^[\d './A-Z[^a-z-]+$/, {
        message: "Only Latin letters, numbers, dots, ', - and spaces allowed",
      });
    }
    return schema.notRequired();
  }),
  cityBill: yup.string().when('isBilling', ([isBilling], schema) => {
    if (isBilling === false) {
      return schema.required('City is required').matches(/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/, {
        message: 'Only Latin letters, single spaces and hyphens allowed',
      });
    }
    return schema.notRequired();
  }),

  countryBill: yup.string().when('isBilling', ([isBilling], schema) => {
    if (isBilling === false) {
      return schema.required('Country is required');
    }
    return schema.notRequired();
  }),

  postalCodeBill: yup.string().when('isBilling', ([isBilling], schema) => {
    if (isBilling === false) {
      return schema
        .required('Postal code is required')
        .test('is-valid-postal-code-bill', 'Invalid postal code format', function (value) {
          const { countryBill } = this.parent;
          const regex = postalCodeRegexMap[countryBill];
          if (!regex) return true;
          return regex.test(value || '');
        });
    }
    return schema.notRequired();
  }),
});

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});
