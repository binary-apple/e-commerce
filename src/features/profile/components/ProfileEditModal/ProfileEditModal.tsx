import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import { useUpdateMutation } from '../../../../api/userApi';
import type { CustomerFromApi } from '../../../../types/auth';
import type { FieldsProfileProps } from '../ProfileForm/types';
import { DateInput } from '../../../../components/DateInput/DateInput';
import { SelectInput } from '../../../../components/SelectInput/SelectInput';
import { useSnackbar } from 'notistack';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { normalizeDate, toUtcIsoString } from '../../../../utils/formatDate';
import { useEffect } from 'react';
import { getValidationSchema } from '../../utils/getFieldValue';
import type { UserAction } from '../../../../types/userApi';

type Props = {
  open: boolean;
  handleClose: () => void;
  user: CustomerFromApi;
  fields: FieldsProfileProps[];
  refetchUser: (token: string) => void;
  initialValues: Record<string, string>;
  addressId?: string;
};

export default function ProfileEditModal({
  open,
  handleClose,
  user,
  fields,
  initialValues,
  refetchUser,
  addressId = '',
}: Props) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [update] = useUpdateMutation();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(fields),
    // enableReinitialize: true,
    onSubmit: async (values) => {
      if (!accessToken) {
        enqueueSnackbar('Missing access token', {
          variant: 'error',
        });
        return;
      }

      const isAddress = !!addressId;
      const actions: UserAction[] = isAddress
        ? [
            {
              action: 'changeAddress',
              address: { ...values },
              addressId: addressId,
            },
          ]
        : Object.entries(values).map(([key, value]) => {
            const actionPrefix = key === 'email' ? 'change' : 'set';
            let formattedValue = value;
            if (key === 'dateOfBirth') {
              formattedValue = normalizeDate(value);
            }
            return {
              action: `${actionPrefix}${key[0].toUpperCase() + key.slice(1)}`,
              [key]: formattedValue,
            };
          });

      try {
        await update({
          version: user.version,
          actions,
          accessToken,
        }).unwrap();

        enqueueSnackbar('Profile updated successfully', { variant: 'success' });
        handleClose();
        refetchUser(accessToken);
      } catch (error) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'data' in error &&
          typeof error.data === 'string'
        ) {
          enqueueSnackbar(`${error.data} Please log in or use another email address.`, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar('Submit failed!', {
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
      formik.setValues(initialValues);
      formik.setTouched({});
      formik.setErrors({});
    }
  }, [open, initialValues]);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      slotProps={{
        paper: {
          sx: { p: 3 },
        },
      }}
    >
      <DialogTitle>Edit Profile</DialogTitle>
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
            {fields.map(({ id, label, type = 'text', options }) => {
              if (type === 'date') {
                return (
                  <DateInput
                    key={id}
                    label={label}
                    value={formik.values[id] || ''}
                    onChange={(date) => {
                      formik.setFieldTouched('dateOfBirth', true, true);
                      if (date) {
                        formik.setFieldValue('dateOfBirth', toUtcIsoString(date));
                      } else {
                        formik.setFieldValue('dateOfBirth', '');
                      }
                    }}
                    onBlur={() => formik.handleBlur({ target: { name: id } })}
                    error={formik.touched[id] && Boolean(formik.errors[id])}
                    helperText={(formik.touched[id] && formik.errors[id]) || ' '}
                    name={id}
                    required
                  />
                );
              }

              if (type === 'select' && options) {
                return (
                  <SelectInput
                    key={id}
                    id={id}
                    label={label}
                    options={options}
                    value={formik.values[id] || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[id] && Boolean(formik.errors[id])}
                    helperText={(formik.touched[id] && formik.errors[id]) || ' '}
                    required
                  />
                );
              }

              return (
                <TextInput
                  key={id}
                  id={id}
                  label={label}
                  type={type}
                  error={formik.touched[id] && Boolean(formik.errors[id])}
                  helperText={(formik.touched[id] && formik.errors[id]) || ' '}
                  value={formik.values[id] || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
              );
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={formik.submitForm}
          variant="contained"
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
