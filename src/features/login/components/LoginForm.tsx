import { Grid } from '@mui/material';
import { fields, formData } from './constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../utils/validationSchema';
import { AuthForm } from '../../../components/AuthForm/AuthForm';
import { TextInput } from '../../../components/TextInput/TextInput';
import { AuthViews } from '../../../types/authViews';

const defaultValues = {
  email: '',
  password: '',
};

const onSubmit = () => {
  //TODO
};
// const onSubmit = (data: LoginData) => {
//   console.log('valid form:', data);
// };

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

  const disableButton = !isValid || isSubmitting;

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
