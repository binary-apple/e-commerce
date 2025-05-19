import { Grid } from '@mui/material';
import { fields, formData } from './constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../utils/validationSchema';
import { AuthForm } from '../../../components/AuthForm/AuthForm';
import { TextInput } from '../../../components/TextInput/TextInput';
import { useLoginMutation, useLazyGetMeQuery } from '../../../api/authApi';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/slices/authSlice';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { Paths } from '../../../types/paths';
import type { LoginData } from '../../../types/form';
import { AuthViews } from '../../../types/authViews';
import { useAuth } from '../../../hooks/useAuth';

const defaultValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const [login, { isLoading }] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { saveAuthTokenToLS } = useAuth();

  const onSubmit = async (data: LoginData) => {
    try {
      const loginResult = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      saveAuthTokenToLS(loginResult.access_token);

      const meResp = await getMe(loginResult.access_token).unwrap();

      dispatch(
        setAuth({
          accessToken: loginResult.access_token,
          email: meResp.email,
        }),
      );

      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate(Paths.HOME);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    }
  };

  const disableButton = !isValid || isSubmitting || isLoading;

  return (
    <AuthForm
      data={formData}
      onSubmit={handleSubmit(onSubmit)}
      disableButton={disableButton}
      view={AuthViews.LOGIN}
    >
      {fields.map(({ id, label, type = 'text' }) => (
        <Grid key={id} size={{ xs: 12 }}>
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
        </Grid>
      ))}
    </AuthForm>
  );
}
