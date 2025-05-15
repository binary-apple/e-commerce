import { Paper, Box, Grid, Button } from '@mui/material';
import type { FormEventHandler, ReactNode } from 'react';
import type { AuthFormData } from './types';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import arrowCurly from '../../assets/images/ArrowCurly.svg';
import Title from '../Title/Title';

import styles from './AuthForm.module.scss';

type FormContainerProps = {
  data: AuthFormData;
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  disableButton: boolean;
};

export function AuthForm({ data, children, onSubmit, disableButton }: FormContainerProps) {
  return (
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        className={styles.title}
      >
        <Box
          component="img"
          src={arrowCurly}
          alt={`${data.titleForm}`}
          sx={{
            width: {
              xs: '40px',
              sm: '50px',
              md: '62px',
            },
            height: 'auto',
          }}
        />
        <Title title={data.titleForm} />
      </Box>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Grid container spacing={1}>
          {children}
          {/* TODO replase loading={false} with actual value and add it to type { AuthFormData } from './types'; */}
          <Button
            type="submit"
            disabled={disableButton}
            color="primary"
            size="large"
            loading={false}
            loadingPosition="start"
            startIcon={<ExitToAppIcon />}
            variant="contained"
            sx={{
              width: '50%',
              minWidth: '180px',
              marginTop: 3,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {data.titleButton}
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
}
