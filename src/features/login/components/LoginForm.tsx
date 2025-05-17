import { Grid } from '@mui/material';
import { fields, formData } from './constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../utils/validationSchema';
import { AuthForm } from '../../../components/AuthForm/AuthForm';
import { TextInput } from '../../../components/TextInput/TextInput';
import { useLoginMutation, useLazyGetMeQuery } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/slices/authSlice';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { Paths } from '../../../types/paths';
import { useAuth } from '../../../hooks/useAuth';
import type { LoginData } from '../../../types/form';

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
  const { saveToken } = useAuth();

  const onSubmit = async (data: LoginData) => {
    try {
      // Login the user
      const loginResult = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      // Save token to localStorage
      saveToken(loginResult.access_token);

      // Get user data
      const meResp = await getMe(loginResult.access_token).unwrap();

      // Update Redux state
      dispatch(
        setAuth({
          accessToken: loginResult.access_token,
          email: meResp.email,
        }),
      );

      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate(Paths.HOME);
    } catch (error) {
      console.error('Login error:', error);
      enqueueSnackbar('Login failed. Please check your credentials and try again.', {
        variant: 'error',
      });
    }
  };

  const disableButton = !isValid || isSubmitting || isLoading;

  return (
    <AuthForm data={formData} onSubmit={handleSubmit(onSubmit)} disableButton={disableButton}>
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
