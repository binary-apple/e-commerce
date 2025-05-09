import { Container } from '@mui/material';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

export default function RegistrationPage() {
  return (
    <Container
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingX: {
          xs: '16px',
          sm: '150px',
        },
        paddingY: {
          xs: '30px',
          sm: '60px',
        },
      }}
    >
      <RegistrationForm />
    </Container>
  );
}
