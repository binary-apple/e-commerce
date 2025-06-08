import { Dialog, DialogContent, DialogTitle } from '@mui/material';
// import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useUpdateMutation } from '../../../../api/userApi';
import { useSnackbar } from 'notistack';
// import { useEffect } from 'react';
import type { RootState } from '../../../../store/store';
// import { AddressWithTypeSchema } from '../../../../utils/validationSchema';
import type { CustomerFromApi } from '../../../../types/auth';
import type { AddressFormValues } from '../../types';
import AddressForm from '../AddressForm/AddressForm';

type Props = {
  userVersion: number;
  open: boolean;
  handleClose: () => void;
  refetchUser: (token: string) => Promise<{ data?: CustomerFromApi }>;
  // fieldValues?: AddressFormValues;
  // isAddressTypeEditable?: boolean;
};

// const initialValues: AddressFormValues = {
//   addressType: '',
//   country: '',
//   city: '',
//   streetName: '',
//   postalCode: '',
//   isDefault: false,
// };

export default function AddAddressModal({
  userVersion,
  open,
  handleClose,
  refetchUser,
  // fieldValues = initialValues,
  // isAddressTypeEditable = true,
}: Props) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [update] = useUpdateMutation();
  const { enqueueSnackbar } = useSnackbar();

  const addAddress = async (values: AddressFormValues) => {
    if (!accessToken) {
      enqueueSnackbar('Missing access token', { variant: 'error' });
      return;
    }

    try {
      await update({
        version: userVersion,
        actions: [
          {
            action: 'addAddress',
            address: {
              country: values.country,
              city: values.city,
              streetName: values.streetName,
              postalCode: values.postalCode,
            },
          },
        ],
        accessToken,
      }).unwrap();

      const result = await refetchUser(accessToken);
      const updatedUser = result.data;

      if (!updatedUser) {
        enqueueSnackbar('Failed to fetch updated user.', { variant: 'error' });
        return;
      }

      const matchingAddress = updatedUser.addresses.find(
        (address) =>
          address.country === values.country &&
          address.city === values.city &&
          address.streetName === values.streetName &&
          address.postalCode === values.postalCode,
      );

      if (!matchingAddress?.id) {
        enqueueSnackbar('Failed to find the newly added address.', {
          variant: 'error',
        });
        return;
      }

      const type = values.addressType;
      const id = matchingAddress.id;
      const baseAction = type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId';

      const updateActions = [{ action: baseAction, addressId: id }];

      if (values.isDefault) {
        updateActions.push({
          action: type === 'billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress',
          addressId: id,
        });
      }

      await update({
        version: updatedUser.version,
        actions: updateActions,
        accessToken,
      }).unwrap();

      enqueueSnackbar('Address added successfully!', { variant: 'success' });
      handleClose();
      // formik.resetForm();
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
        enqueueSnackbar('Address submit failed!', {
          variant: 'error',
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth slotProps={{ paper: { sx: { p: 3 } } }}>
      <DialogTitle>Add address</DialogTitle>
      <DialogContent>
        <AddressForm onFormSubmit={addAddress} onCancel={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
