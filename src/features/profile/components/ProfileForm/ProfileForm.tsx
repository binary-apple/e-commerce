import { Divider, Grid, ListItemText, Typography } from '@mui/material';
import { countryMap, fieldsConfig } from './constants';
import { Fragment } from 'react/jsx-runtime';
import { useLazyGetMeQuery } from '../../../../api/authApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import { formatDate } from '../../../../utils/formatDate';
import type { AddressWithId, CustomerFromApi } from '../../../../types/auth';
import type { AddressFieldId, CustomerFieldId, ProfileFieldIds } from './types';

function getFieldValue(
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

export default function ProfileForm() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [trigger, { data: user }] = useLazyGetMeQuery();

  useEffect(() => {
    if (accessToken) {
      trigger(accessToken);
    }
  }, [accessToken, trigger]);

  if (!user) return null;

  const getAddressList = (type: 'shipping' | 'billing') => {
    const ids = type === 'shipping' ? user.shippingAddressIds : user.billingAddressIds;
    return ids.map((id) => user.addresses.find((addr) => addr.id === id));
  };

  return (
    <Grid container spacing={1}>
      {fieldsConfig.map(({ section, fields, addressType }) => {
        const isAddressSection = addressType === 'shipping' || addressType === 'billing';

        const sourceList = isAddressSection ? getAddressList(addressType) : [user];

        return (
          <Fragment key={section}>
            <Grid size={{ xs: 12 }}>
              <Divider>{section}</Divider>
            </Grid>
            {sourceList?.length === 0 && isAddressSection && (
              <Grid>
                <Typography variant="body2">There are no addresses here yet.</Typography>
              </Grid>
            )}
            {sourceList?.map(
              (source, index) =>
                source && (
                  <Fragment key={index}>
                    {isAddressSection && sourceList.length > 1 && (
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                          Address {index + 1}
                        </Typography>
                      </Grid>
                    )}
                    {fields.map(({ id, label }) => {
                      let value = getFieldValue(source, id);
                      if (id === 'dateOfBirth' && value) {
                        value = formatDate(value);
                      }
                      return (
                        <Grid key={id + index} size={{ xs: 12, md: 6 }}>
                          <ListItemText primary={label} secondary={value} />
                        </Grid>
                      );
                    })}
                  </Fragment>
                ),
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}
