import type { AddressWithId, CustomerFromApi } from '../../../types/auth';
import { addressSchema, userInfoSchema } from '../../../utils/validationSchema';
import type {
  AddressFieldId,
  CustomerFieldId,
  FieldsProfileProps,
  ProfileFieldIds,
} from '../components/ProfileForm/types';
import { ADDRESS_KEYS } from '../constants';

export function getFieldValue(
  source: CustomerFromApi | AddressWithId,
  id: ProfileFieldIds,
): string | undefined {
  if (isCustomer(source) && isCustomerField(id)) {
    return source[id];
  }

  if (!isCustomer(source) && isAddressField(id)) {
    return source[id];
  }

  return undefined;
}

function isCustomer(source: CustomerFromApi | AddressWithId): source is CustomerFromApi {
  return 'firstName' in source && 'lastName' in source;
}

function isCustomerField(id: string): id is CustomerFieldId {
  return ['firstName', 'lastName', 'dateOfBirth', 'email'].includes(id);
}

function isAddressField(id: string): id is AddressFieldId {
  return ADDRESS_KEYS.includes(id);
}
export function getValidationSchema(fields: FieldsProfileProps[]) {
  const hasAddressFields = fields.some((field) => isAddressField(field.id));
  const hasUserFields = fields.some((field) => !isAddressField(field.id));

  if (hasAddressFields && !hasUserFields) {
    return addressSchema;
  }

  return userInfoSchema;
}

export function isAddressWithId(source: CustomerFromApi | AddressWithId): source is AddressWithId {
  return source && 'streetName' in source;
}
