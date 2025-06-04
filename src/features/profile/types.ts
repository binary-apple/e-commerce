import type { InputProps } from '@mui/material';

export type AddressFormValues = {
  addressType: string;
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isDefault: boolean;
};

export type FieldType = NonNullable<InputProps['type']>;
export type FieldId = keyof AddressFormValues;

export type AddressFieldProps = {
  id: FieldId;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
};
