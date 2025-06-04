import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
} from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useUpdateMutation } from '../../../../api/userApi';
import { useSnackbar } from 'notistack';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { useEffect } from 'react';
import type { RootState } from '../../../../store/store';
import { AddressWithTypeSchema } from '../../../../utils/validationSchema';
import { SelectInput } from '../../../../components/SelectInput/SelectInput';
import { ADDRESS_TYPE_OPTIONS } from '../../constants';
import { ADDRESS_FIELDS } from '../../../../constants';
import type { CustomerFromApi } from '../../../../types/auth';
import type { AddressFormValues } from '../../types';

type Props = {
  userVersion: number;
  open: boolean;
  handleClose: () => void;
  refetchUser: (token: string) => Promise<{ data?: CustomerFromApi }>;
};

const initialValues: AddressFormValues = {
  addressType: '',
  country: '',
  city: '',
  streetName: '',
  postalCode: '',
  isDefault: false,
};

export default function AddAddressModal({ userVersion, open, handleClose, refetchUser }: Props) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [update, { isLoading }] = useUpdateMutation();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik<AddressFormValues>({
    initialValues,
    validationSchema: AddressWithTypeSchema,
    onSubmit: async (values) => {
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
        formik.resetForm();
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
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth slotProps={{ paper: { sx: { p: 3 } } }}>
      <DialogTitle>Add address</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr' },
              mt: 1,
            }}
          >
            <SelectInput
              key="addressType"
              id="addressType"
              label="Address Type"
              options={ADDRESS_TYPE_OPTIONS}
              value={formik.values.addressType || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressType && Boolean(formik.errors.addressType)}
              helperText={(formik.touched.addressType && formik.errors.addressType) || ' '}
              required
            />

            {ADDRESS_FIELDS.map(({ id, label, type = 'text', options }) => (
              <Grid key={id} size={{ xs: 12, md: 6 }}>
                {type === 'select' ? (
                  <SelectInput
                    id={id}
                    label={label}
                    options={options || []}
                    value={formik.values[id] ?? ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched[id] && formik.errors[id])}
                    helperText={(formik.touched[id] && formik.errors[id]) || ' '}
                    required
                  />
                ) : (
                  <TextInput
                    id={id}
                    label={label}
                    type={type}
                    value={formik.values[id] ?? ''}
                    onInput={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched[id] && formik.errors[id])}
                    helperText={(formik.touched[id] && formik.errors[id]) || ' '}
                    required
                  />
                )}
              </Grid>
            ))}

            <FormControlLabel
              control={
                <Switch
                  name="isDefault"
                  checked={formik.values.isDefault}
                  onChange={formik.handleChange}
                  slotProps={{
                    input: { 'aria-label': 'set default address' },
                  }}
                />
              }
              label={`Set as default ${formik.values.addressType || 'address'}`}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={formik.submitForm}
          variant="contained"
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting || isLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
