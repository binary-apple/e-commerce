import { Container, Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import OopsBox from './components/OopsBox';
import { NotFoundConstants } from './constants.ts';

export default function NotFoundPage() {
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
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <OopsBox />
        <Typography component="h3" variant="h6" textAlign="center">
          {NotFoundConstants.mainMessage}
        </Typography>
        <Link
          component={RouterLink}
          variant="body2"
          to="/"
          color="primary"
          sx={{
            textDecoration: 'underline',
          }}
        >
          {NotFoundConstants.linkLabel}
        </Link>
      </Box>
    </Container>
  );
}
