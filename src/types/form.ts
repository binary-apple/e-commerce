import type { InputProps } from '@mui/material';
import type { registrationSchema } from '../utils/validationSchema';
import type { InferType } from 'yup';

export type RegistrationData = InferType<typeof registrationSchema>;

type FieldId = keyof RegistrationData;

export type FieldType = NonNullable<InputProps['type']>;

export type FieldProps = {
  id: FieldId;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
};

export type FieldSection = {
  section: string;
  fields: FieldProps[];
};
