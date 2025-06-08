import { Box, Button, FormControlLabel, Grid, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { AddressWithTypeSchema } from '../../../../utils/validationSchema';
import { SelectInput } from '../../../../components/SelectInput/SelectInput';
import { ADDRESS_TYPE_OPTIONS } from '../../constants';
import { ADDRESS_FIELDS } from '../../../../constants';
import type { AddressFormValues } from '../../types';

type Props = {
  onFormSubmit: (data: AddressFormValues) => Promise<void>;
  onCancel: () => void;
  fieldValues?: AddressFormValues;
  isAddressTypeEditable?: boolean;
};

const initialValues: AddressFormValues = {
  addressType: '',
  country: '',
  city: '',
  streetName: '',
  postalCode: '',
  isDefault: false,
};

export default function AddressForm({
  onFormSubmit,
  onCancel,
  fieldValues = initialValues,
  isAddressTypeEditable = true,
}: Props) {
  const formik = useFormik<AddressFormValues>({
    initialValues: fieldValues,
    validationSchema: AddressWithTypeSchema,
    onSubmit: (values) => {
      return onFormSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
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
            readOnly={!isAddressTypeEditable}
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
      <Box>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={formik.submitForm}
          variant="contained"
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
