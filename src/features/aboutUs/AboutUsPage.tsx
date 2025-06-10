import { Box, Typography } from '@mui/material';
import { AboutUsConstants } from './constants';

export default function AboutUsPage() {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        width: '100%',
        maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
        gap: 2,
        margin: '0 auto auto',
        py: { lg: 6, md: 4, xs: 2 },
      }}
    >
      <Typography component="h1" variant="h3" textAlign="center">
        {AboutUsConstants.title}
      </Typography>
      <Typography component="p" variant="body1" textAlign="center">
        {AboutUsConstants.description}
      </Typography>
    </Box>
  );
}
