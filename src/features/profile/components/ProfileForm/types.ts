import type { FieldType } from '../../../../types/form';

export type CustomerFieldId = 'firstName' | 'lastName' | 'dateOfBirth';
export type AddressFieldId = 'streetName' | 'city' | 'country' | 'postalCode';

export type ProfileFieldIds = CustomerFieldId | AddressFieldId;

export type FieldsProfileProps = {
  id: ProfileFieldIds;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
};

export type FieldsProfileSection = {
  section: string;
  fields: FieldsProfileProps[];
  addressType?: 'shipping' | 'billing';
};
