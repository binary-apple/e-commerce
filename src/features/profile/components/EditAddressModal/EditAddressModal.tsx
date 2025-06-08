import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { useUpdateMutation } from '../../../../api/userApi';
import { useSnackbar } from 'notistack';
import type { RootState } from '../../../../store/store';
import type { CustomerFromApi } from '../../../../types/auth';
import type { AddressFormValues, AddressFormValuesWithId } from '../../types';
import AddressForm from '../AddressForm/AddressForm';
import type { UserAction } from '../../../../types/userApi';

type Props = {
  userVersion: number;
  open: boolean;
  handleClose: () => void;
  refetchUser: (token: string) => Promise<{ data?: CustomerFromApi }>;
  fieldValues: AddressFormValuesWithId;
  // isAddressTypeEditable?: boolean;
};

// const initialValues: AddressFormValuesWithId = {
//   addressType: '',
//   country: '',
//   city: '',
//   streetName: '',
//   postalCode: '',
//   isDefault: false,
// };

export default function EditAddressModal({
  userVersion,
  open,
  handleClose,
  refetchUser,
  fieldValues,
  // isAddressTypeEditable = true,
}: Props) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [update] = useUpdateMutation();
  const { enqueueSnackbar } = useSnackbar();

  const editAddress = async (values: AddressFormValues) => {
    if (!accessToken) {
      enqueueSnackbar('Missing access token', { variant: 'error' });
      return;
    }

    try {
      const actions: UserAction[] = [
        {
          action: 'changeAddress',
          addressId: fieldValues.id,
          address: {
            country: values.country,
            city: values.city,
            streetName: values.streetName,
            postalCode: values.postalCode,
          },
        },
      ];

      if (values.isDefault) {
        actions.push({
          action:
            values.addressType === 'billing'
              ? 'setDefaultBillingAddress'
              : 'setDefaultShippingAddress',
          addressId: fieldValues.id,
        });
      }

      await update({
        version: userVersion,
        actions,
        accessToken,
      }).unwrap();

      await refetchUser(accessToken);
      enqueueSnackbar('Address updated successfully!', { variant: 'success' });
      handleClose();
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'string'
      ) {
        enqueueSnackbar(`${error.data}`, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Address update failed!', {
          variant: 'error',
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth slotProps={{ paper: { sx: { p: 3 } } }}>
      <DialogTitle>Edit address</DialogTitle>
      <DialogContent>
        <AddressForm
          onFormSubmit={editAddress}
          onCancel={handleClose}
          fieldValues={fieldValues}
          isAddressTypeEditable={false}
        />
      </DialogContent>
    </Dialog>
  );
}
