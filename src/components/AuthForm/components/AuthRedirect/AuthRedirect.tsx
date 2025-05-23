import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { redirectionConfig } from './constants';
import type { AuthViews } from '../../../../types/authViews.ts';

type AuthRedirectProps = {
  view: AuthViews;
};

export default function AuthRedirect({ view }: AuthRedirectProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 0.5,
      }}
    >
      <Typography component="h4" variant="body1">
        {redirectionConfig[view].title}
      </Typography>
      <Link component={RouterLink} to={redirectionConfig[view].url}>
        {redirectionConfig[view].linkLabel}
      </Link>
    </Box>
  );
}
