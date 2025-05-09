import { Divider, Grid } from '@mui/material';
import { AuthForm } from '../../../../components/AuthForm/AuthForm';
import { fieldsConfig, formData } from './constants';
import { TextInput } from '../../../../components/InputField/InputField';

const onSubmit = () => {
  // TODO
};

export default function RegistrationForm() {
  return (
    <AuthForm data={formData} onSubmit={onSubmit}>
      {fieldsConfig.map(({ section, fields }) => (
        <>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ marginY: 3 }}>{section}</Divider>
          </Grid>
          {fields.map(({ id, label, type = 'text' }) => (
            <Grid key={id} size={{ xs: 12, md: 6 }}>
              <TextInput id={id} label={label} type={type} />
            </Grid>
          ))}
        </>
      ))}
    </AuthForm>
  );
}
