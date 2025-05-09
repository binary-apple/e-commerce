import type { InputProps } from '@mui/material';

export type FieldType = NonNullable<InputProps['type']>;

export type FieldProps = {
  id: string;
  label: string;
  type?: FieldType;
};

export type FieldSection = {
  section: string;
  fields: FieldProps[];
};
