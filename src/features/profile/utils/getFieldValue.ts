import type { AddressWithId, CustomerFromApi } from '../../../types/auth';
import { countryMap } from '../components/ProfileForm/constants';
import type {
  AddressFieldId,
  CustomerFieldId,
  ProfileFieldIds,
} from '../components/ProfileForm/types';

export function getFieldValue(
  source: CustomerFromApi | AddressWithId,
  id: ProfileFieldIds,
): string | undefined {
  if (isCustomer(source) && isCustomerField(id)) {
    return source[id];
  }

  if (!isCustomer(source) && isAddressField(id)) {
    if (id === 'country') {
      return countryMap[source[id]] || source[id];
    }
    return source[id];
  }

  return undefined;
}
function isCustomer(source: CustomerFromApi | AddressWithId): source is CustomerFromApi {
  return 'firstName' in source && 'lastName' in source;
}

function isCustomerField(id: string): id is CustomerFieldId {
  return ['firstName', 'lastName', 'dateOfBirth'].includes(id);
}

function isAddressField(id: string): id is AddressFieldId {
  return ['streetName', 'city', 'country', 'postalCode'].includes(id);
}
