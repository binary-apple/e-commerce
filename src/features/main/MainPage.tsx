import { Link } from 'react-router';
import { Grid, Box, Button } from '@mui/material';

export default function MainPage() {
  return (
    <Grid size={{ xs: 12 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="20px"
      >
        <div>Main Page</div>
        <Button
          component={Link}
          to="/catalog"
          color="primary"
          loading={false}
          variant="contained"
          sx={{
            minWidth: '180px',
            marginTop: 1,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Catalog
        </Button>
      </Box>
    </Grid>
  );
}
