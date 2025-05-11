import type { FieldSection } from '../../../../types/form';

export const formData = {
  titleForm: 'Login',
  titleButton: 'Sign In',
  titleBottomBox: "Don't have an account?",
  titleBottomButton: 'Registration',
  bottomButtonPath: '/registration',
};

export const fieldsConfig: FieldSection[] = [
  {
    section: 'Login',
    fields: [
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'password', label: 'Password', type: 'password' },
    ],
  },
];
