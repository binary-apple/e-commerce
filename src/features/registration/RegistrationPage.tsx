import { Container } from '@mui/material';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import loopBg from '../../assets/images/LoopBg.svg';

import styles from './RegistrationPage.module.scss';

export default function RegistrationPage() {
  return (
    <Container
      sx={{
        paddingX: {
          xs: '16px',
          sm: '150px',
        },
        paddingY: {
          xs: '30px',
          sm: '60px',
        },
        backgroundImage: `url(${loopBg})`,
      }}
      className={styles.container}
    >
      <RegistrationForm />
    </Container>
  );
}
