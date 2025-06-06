import { Box, Container, Paper } from '@mui/material';
import ProfileForm from './components/ProfileForm/ProfileForm';
import loopBg from '../../assets/images/LoopBg.svg';
import MissionPawIcon from '../../assets/images/MissionPawIcon.png';

import styles from './ProfilePage.module.scss';
import { pageData } from './components/ProfileForm/constants';
import Title from '../../components/Title/Title';

export default function ProfilePage() {
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
      <Paper
        sx={{
          padding: {
            xs: '1rem',
            sm: '2rem',
          },
          marginY: {
            xs: '1rem',
            sm: '2rem',
          },
        }}
      >
        <Box display="flex" flexDirection="column" gap={1} className={styles.title}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <Box
              component="img"
              src={MissionPawIcon}
              alt="bg"
              sx={{
                width: {
                  xs: '40px',
                  sm: '50px',
                  md: '62px',
                },
                height: 'auto',
              }}
            />
            <Title title={pageData.titleForm} />
          </Box>
        </Box>
        <ProfileForm />
      </Paper>
    </Container>
  );
}
