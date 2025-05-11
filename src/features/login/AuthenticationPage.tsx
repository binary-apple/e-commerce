import { Container } from '@mui/material';
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm.tsx';
import loopBg from '../../assets/images/LoopBg.svg';

import styles from './AuthenticationPage.module.scss';

export default function AuthenticationPage() {
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
        backgroundImage: `url(${loopBg})`,
      }}
      className={styles.container}
    >
      <AuthenticationForm />
    </Container>
  );
}
