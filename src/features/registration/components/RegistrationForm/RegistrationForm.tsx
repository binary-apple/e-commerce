import { Divider, Grid } from '@mui/material';
import { AuthForm } from '../../../../components/AuthForm/AuthForm';
import { fieldsConfig, formData } from './constants';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { Fragment } from 'react/jsx-runtime';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../../../utils/validationSchema';
import { DateInput } from '../../../../components/DateInput/DateInput';
import { SelectInput } from '../../../../components/SelectInput/SelectInput';
import { useEffect, useRef } from 'react';
import { createCustomer } from '../../../../api/customers';
import { loginCustomer } from '../../../../api/auth';
import type { RegistrationData } from '../../../../types/form';
import { useSnackbar } from 'notistack';
import { ResponseCodes } from '../../../../api/constants';
import { CustomError } from '../../../../utils/CustomError';
import { AuthViews } from '../../../../types/authViews';

const defaultValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  street: '',
  city: '',
  country: '',
  postalCode: '',
};

export default function RegistrationForm() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });
  const selectedCountry = useWatch({ control, name: 'country' });

  const hasSelectedCountry = useRef(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (selectedCountry && hasSelectedCountry.current) {
      trigger('postalCode');
    } else if (selectedCountry) {
      hasSelectedCountry.current = true;
    }
  }, [selectedCountry, trigger]);

  const disableButton = !isValid || isSubmitting;

  const onSubmit = async (data: RegistrationData) => {
    try {
      await createCustomer({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dob).toISOString().split('T')[0],
        addresses: [
          {
            streetName: data.street,
            city: data.city,
            country: data.country,
            postalCode: data.postalCode,
          },
        ],
      });

      const token = await loginCustomer(data.email, data.password);

      localStorage.setItem('userToken', token);

      enqueueSnackbar('Successful Registration!', { variant: 'success' });
      // TODO redirect here
      // navigate('/main');
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.status === ResponseCodes.CONFLICT) {
          enqueueSnackbar(`${error.message} Please log in or use another email address.`, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(`Registration failed! ${error.message}`, {
            variant: 'error',
          });
        }
      } else {
        enqueueSnackbar(`Something went wrong... Please try again later.`, { variant: 'error' });
      }
    }
  };

  return (
    <AuthForm
      data={formData}
      onSubmit={handleSubmit(onSubmit)}
      disableButton={disableButton}
      view={AuthViews.registration}
    >
      {fieldsConfig.map(({ section, fields }) => (
        <Fragment key={section}>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ marginBottom: 3 }}>{section}</Divider>
          </Grid>
          {fields.map(({ id, label, type = 'text', options }) => (
            <Grid key={id} size={{ xs: 12, md: 6 }}>
              {type === 'date' ? (
                <Controller
                  name={id}
                  control={control}
                  render={({ field }) => (
                    <DateInput
                      {...field}
                      id={id}
                      label={label}
                      type={type}
                      error={Boolean(errors[id])}
                      helperText={errors[id]?.message}
                      required
                      sx={{ shrink: 'true' }}
                    />
                  )}
                />
              ) : type === 'select' ? (
                <Controller
                  name={id}
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      id={id}
                      label={label}
                      options={options || []}
                      error={Boolean(errors[id])}
                      helperText={errors[id]?.message}
                      required
                    />
                  )}
                />
              ) : (
                <Controller
                  name={id}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      id={id}
                      label={label}
                      type={type}
                      error={Boolean(errors[id])}
                      helperText={errors[id]?.message}
                      required
                    />
                  )}
                />
              )}
            </Grid>
          ))}
        </Fragment>
      ))}
    </AuthForm>
  );
}
