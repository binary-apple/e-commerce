import { Button, Chip, Divider, Grid, IconButton, ListItemText, Typography } from '@mui/material';
import { countryMap, fieldsConfig } from './constants';
import { Fragment } from 'react/jsx-runtime';
import { useLazyGetMeQuery } from '../../../../api/authApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import { formatDate } from '../../../../utils/formatDate';
import { getFieldValue } from '../../utils/getFieldValue';
import EditIcon from '@mui/icons-material/Edit';
import ProfileEditModal from '../ProfileEditModal/ProfileEditModal';
import type { FieldsProfileProps } from './types';
import type { AddressWithId, CustomerFromApi } from '../../../../types/auth';
import PasswordEditModal from '../PasswordEditModal/PasswordEditModal';
import AddAddressModal from '../AddAddressModal/AddAddressModal';

export default function ProfileForm() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [trigger, { data: user }] = useLazyGetMeQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState('');
  const [editableFields, setEditableFields] = useState<FieldsProfileProps[]>([]);
  const [initialValues, setInitialValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (accessToken) {
      trigger(accessToken);
    }
  }, [accessToken, trigger]);

  if (!user) return null;

  const { defaultBillingAddressId, defaultShippingAddressId } = user;

  const getAddressList = (type: 'shipping' | 'billing') => {
    const ids = type === 'shipping' ? user.shippingAddressIds : user.billingAddressIds;
    return ids.map((id) => user.addresses.find((addr) => addr.id === id));
  };

  const handleEditClick = (
    fields: FieldsProfileProps[],
    source: CustomerFromApi | AddressWithId,
  ) => {
    setEditableFields(fields);
    const values = fields.reduce<Record<string, string>>((acc, { id }) => {
      const value = getFieldValue(source, id);
      acc[id] = value || '';
      return acc;
    }, {});
    setInitialValues({ ...values });
    if ('streetName' in source) {
      setCurrentAddressId(source.id);
    } else {
      setCurrentAddressId('');
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditableFields([]);
  };

  const handlePasswordOpen = () => {
    setPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setPasswordModalOpen(false);
    setEditableFields([]);
  };

  const handleAddAddressOpen = () => {
    setAddAddressOpen(true);
  };

  const handleCloseAddAddress = () => {
    setAddAddressOpen(false);
    if (accessToken) {
      trigger(accessToken);
    }
  };

  return (
    <>
      <Divider></Divider>
      <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button color="secondary" variant="outlined" size="small" onClick={handlePasswordOpen}>
          Change Password
        </Button>
        <Button color="secondary" variant="outlined" size="small" onClick={handleAddAddressOpen}>
          Add Address
        </Button>
      </Grid>
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
                      <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center' }}>
                        {isAddressSection && (
                          <Grid
                            size={{ xs: 6 }}
                            spacing={2}
                            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                          >
                            <Typography variant="subtitle2">Address {index + 1}</Typography>
                            {addressType === 'shipping' &&
                              source.id === defaultShippingAddressId && (
                                <Chip label="Default" color="info" variant="outlined" />
                              )}
                            {addressType === 'billing' && source.id === defaultBillingAddressId && (
                              <Chip label="Default" color="info" variant="outlined" />
                            )}
                          </Grid>
                        )}
                        <Grid
                          size={isAddressSection ? { xs: 6 } : { xs: 12 }}
                          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                        >
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            onClick={() => handleEditClick(fields, source)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      {fields.map(({ id, label }) => {
                        let value = getFieldValue(source, id);
                        if (id === 'dateOfBirth' && value) {
                          value = formatDate(value);
                        }
                        if (id === 'country' && value) {
                          value = countryMap[value] || value;
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
      <ProfileEditModal
        open={modalOpen}
        handleClose={handleCloseModal}
        user={user}
        fields={editableFields}
        initialValues={initialValues}
        addressId={currentAddressId}
        refetchUser={trigger}
      />
      <PasswordEditModal
        open={passwordModalOpen}
        user={user}
        handleClose={handleClosePasswordModal}
        refetchUser={trigger}
      />
      <AddAddressModal
        userVersion={user.version}
        open={addAddressOpen}
        handleClose={handleCloseAddAddress}
        refetchUser={trigger}
      />
    </>
  );
}
