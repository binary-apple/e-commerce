import type { InputProps } from '@mui/material';
import type {
  AddressWithTypeSchema,
  loginSchema,
  registrationSchema,
} from '../utils/validationSchema';
import type { InferType } from 'yup';

export type RegistrationData = InferType<typeof registrationSchema>;
export type AddressData = InferType<typeof AddressWithTypeSchema>;
export type LoginData = InferType<typeof loginSchema>;

export type FieldId = keyof RegistrationData;
export type AddressFieldId = keyof AddressData;

export type FieldType = NonNullable<InputProps['type']>;

export type FieldProps<TId extends string = string> = {
  id: TId;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
};

export type FieldSection<T extends string> = {
  section: string;
  fields: FieldProps<T>[];
};

type LoginFieldId = keyof LoginData;

export type LoginFieldProps = {
  id: LoginFieldId;
  label: string;
  type?: 'email' | 'password';
};
