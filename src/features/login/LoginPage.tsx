import { Container } from '@mui/material';
import LoginForm from './components/LoginForm';

import styles from './LoginPage.module.scss';

export default function LoginPage() {
  return (
    <Container
      sx={{
        paddingX: {
          xs: '16px',
          sm: '100px',
          md: '150px',
        },
        paddingY: {
          xs: '30px',
          sm: '60px',
        },
        //TODO move bg-image to src/components/AuthForm/AuthForm.tsx
        // backgroundImage: `url(${loopBg})`,
      }}
      className={styles.container}
    >
      <LoginForm />
    </Container>
  );
}
