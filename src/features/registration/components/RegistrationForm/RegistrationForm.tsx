import { Divider, Grid } from '@mui/material';
import { AuthForm } from '../../../../components/AuthForm/AuthForm';
import { fieldsConfig, formData } from './constants';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { Fragment } from 'react/jsx-runtime';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../../../utils/validationSchema';
import { DateInput } from '../../../../components/DateInput/DateInput';
import { SelectInput } from '../../../../components/SelectInput/SelectInput';

const defaultValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
};

const onSubmit = () => {
  //TODO
};
// const onSubmit = (data: RegistrationData) => {
//   console.log('valid form:', data);
// };

export default function RegistrationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });

  return (
    <AuthForm data={formData} onSubmit={handleSubmit(onSubmit)}>
      {fieldsConfig.map(({ section, fields }) => (
        <Fragment key={section}>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ marginY: 3 }}>{section}</Divider>
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
