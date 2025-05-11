import { Box, Grid } from '@mui/material';

export default function CatalogPage() {
  return (
    <Grid size={{ xs: 12 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="20px"
      >
        <div>Catalog</div>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </Box>
    </Grid>
  );
}
