import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router';
import pages from './constants';

export default function MainLayout() {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} sx={{ boxShadow: 'none' }}>
        <Container fixed>
          <Toolbar disableGutters sx={{ minHeight: 'auto', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                HelpPet
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              {pages.map((page) => (
                <Button key={page.path} component={Link} to={page.path} color="primary">
                  {page.title}
                </Button>
              ))}
            </Box>
            <Box>
              <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                Exit
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container fixed sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
