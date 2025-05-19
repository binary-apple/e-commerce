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
import { CustomError } from '../../../../utils/CustomError';
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
  defaultShipping: false,
};

export default function RegistrationForm() {
  const [defaultShipping, setDefaultShipping] = useState(false);

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

  const disableButton = !isValid || isSubmitting;

  const onSubmit = async (data: RegistrationData) => {
    try {
      await register({
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
        defaultShippingAddress: defaultShipping ? 0 : undefined,
      }).unwrap();

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

  const handleDefaultShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultShipping(event.target.checked);
  };

  return (
    <AuthForm
      data={formData}
      onSubmit={handleSubmit(onSubmit)}
      disableButton={disableButton}
      view={AuthViews.REGISTRATION}
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
          {section === 'Shipping Address' && (
            <Grid size={{ xs: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    name="defaultShipping"
                    checked={defaultShipping}
                    onChange={handleDefaultShipping}
                    slotProps={{ input: { 'aria-label': 'controlled' } }}
                  />
                }
                label="Set as default shipping address"
              />
            </Grid>
          )}
        </Fragment>
      ))}
    </AuthForm>
  );
}
