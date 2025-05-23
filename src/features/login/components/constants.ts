import type { LoginFieldProps } from '../../../types/form';

export const formData = {
  titleForm: 'Login',
  titleButton: 'Login',
};

export const fields: LoginFieldProps[] = [
  { id: 'email', label: 'Email' },
  { id: 'password', label: 'Password', type: 'password' },
];
