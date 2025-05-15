import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="body1" gutterBottom>
        Page not found
      </Typography>
      <Button
        component={Link}
        to="/"
        color="primary"
        variant="contained"
        sx={{
          minWidth: '180px',
          textTransform: 'none',
        }}
      >
        Go to the main page
      </Button>
    </Box>
  );
}
