import { Divider, Grid, Switch, FormControlLabel } from '@mui/material';
import { AuthForm } from '../../../../components/AuthForm/AuthForm';
import { fieldsConfig, formData } from './constants';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { Fragment } from 'react/jsx-runtime';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../../../utils/validationSchema';
import { DateInput } from '../../../../components/DateInput/DateInput';
import { SelectInput } from '../../../../components/SelectInput/SelectInput';
import { useEffect, useRef, useState } from 'react';
import type { RegistrationData } from '../../../../types/form';
import { useSnackbar } from 'notistack';
import { ResponseCodes } from '../../../../api/constants';
import { useNavigate } from 'react-router';
import { Paths } from '../../../../types/paths';
import { useLoginMutation, useLazyGetMeQuery, useRegisterMutation } from '../../../../api/authApi';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../../store/slices/authSlice';
import { AuthViews } from '../../../../types/authViews';
import { useAuth } from '../../../../hooks/useAuth';

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
  streetBill: '',
  cityBill: '',
  countryBill: '',
  postalCodeBill: '',
  isBilling: false,
};

export default function RegistrationForm() {
  const [defaultShipping, setDefaultShipping] = useState(false);
  const [defaultBilling, setDefaultBilling] = useState(false);

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
  const selectedCountryBill = useWatch({ control, name: 'countryBill' });
  const isBilling = useWatch({ control, name: 'isBilling' });

  const hasSelectedCountry = useRef(false);
  const hasSelectedCountryBill = useRef(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  const { saveAuthTokenToLS } = useAuth();

  useEffect(() => {
    if (selectedCountry && hasSelectedCountry.current) {
      trigger('postalCode');
    } else if (selectedCountry) {
      hasSelectedCountry.current = true;
    }
  }, [selectedCountry, trigger]);

  useEffect(() => {
    if (selectedCountryBill && hasSelectedCountryBill.current) {
      trigger('postalCodeBill');
    } else if (selectedCountryBill) {
      hasSelectedCountryBill.current = true;
    }
  }, [selectedCountryBill, trigger]);

  const disableButton = !isValid || isSubmitting;

  const onSubmit = async (data: RegistrationData) => {
    const shippingAddress = {
      streetName: data.street,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode,
    };

    const formData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: new Date(data.dob).toISOString().split('T')[0],
      addresses: [shippingAddress],
      defaultShippingAddress: defaultShipping ? 0 : undefined,
      defaultBillingAddress: defaultBilling ? (isBilling ? 0 : 1) : undefined,
      shippingAddresses: [0],
      billingAddresses: isBilling ? [0] : [1],
    };

    if (!isBilling) {
      const billingAddress = {
        streetName: data.streetBill || '',
        city: data.cityBill || '',
        country: data.countryBill || '',
        postalCode: data.postalCodeBill || '',
      };
      formData.addresses.push(billingAddress);
    }

    try {
      await register(formData).unwrap();

      const loginResult = await login({ email: data.email, password: data.password }).unwrap();

      saveAuthTokenToLS(loginResult.access_token);

      const meResp = await getMe(loginResult.access_token).unwrap();

      dispatch(
        setAuth({
          accessToken: loginResult.access_token,
          email: meResp.email,
        }),
      );

      enqueueSnackbar('Successful Registration!', { variant: 'success' });
      navigate(Paths.HOME);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'data' in error &&
        typeof error.data === 'string'
      ) {
        if (error.status === ResponseCodes.CONFLICT) {
          enqueueSnackbar(`${error.data} Please log in or use another email address.`, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(`Registration failed! ${error.data}`, {
            variant: 'error',
          });
        }
      } else {
        enqueueSnackbar('Something went wrong... Please try again later.', {
          variant: 'error',
        });
      }
    }
  };

  const handleDefaultShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultShipping(event.target.checked);
  };

  const handleDefaultBilling = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultBilling(event.target.checked);
  };

  return (
    <AuthForm
      data={formData}
      onSubmit={handleSubmit(onSubmit)}
      disableButton={disableButton}
      view={AuthViews.REGISTRATION}
    >
      {fieldsConfig.map(({ section, fields }) => {
        if (section === 'Billing Address' && isBilling) {
          return null;
        }

        return (
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
                        value={String(field.value || '')}
                        id={id}
                        label={label}
                        type={type}
                        error={Boolean(errors[id])}
                        helperText={errors[id]?.message}
                        required
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
            {section === 'Shipping Address' && (
              <>
                <Grid size={{ xs: 6 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="defaultShipping"
                        checked={defaultShipping}
                        onChange={handleDefaultShipping}
                        slotProps={{ input: { 'aria-label': 'set default Shipping' } }}
                      />
                    }
                    label="Set as default shipping address"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Controller
                    name="isBilling"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value}
                            onChange={(event) => {
                              field.onChange(event.target.checked);
                              trigger();
                            }}
                            slotProps={{ input: { 'aria-label': 'isBilling' } }}
                          />
                        }
                        label="Also use as billing address"
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            {section === 'Billing Address' && (
              <Grid size={{ xs: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      name="defaultBilling"
                      checked={defaultBilling}
                      onChange={handleDefaultBilling}
                      slotProps={{ input: { 'aria-label': 'set default' } }}
                    />
                  }
                  label="Set as default billing address"
                />
              </Grid>
            )}
          </Fragment>
        );
      })}
    </AuthForm>
  );
}
