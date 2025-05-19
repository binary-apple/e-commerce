import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { navItems, customIconHoverOpacity } from './constants';
import classes from './Header.module.scss';
import { Paths } from '../../../types/paths';
import { NavLink, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store';
import { logout } from '../../../store/slices/authSlice';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../../hooks/useAuth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { clearAuthTokenLS } = useAuth();

  const handleLogout = () => {
    clearAuthTokenLS();

    dispatch(logout());

    enqueueSnackbar('Logged out successfully', { variant: 'success' });

    navigate(Paths.AUTH);
  };

  const handleDrawerToggle = () => {
    setMobileMenuOpen((previousState) => !previousState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {Object.entries(navItems).map(([key, value], i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton component={NavLink} to={key} sx={{ textAlign: 'center' }}>
              <ListItemText primary={value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated && (
          <>
            <ListItem disablePadding>
              <ListItemText
                sx={{ textAlign: 'center', padding: '8px' }}
                slotProps={{
                  primary: { className: classes['user-info'] },
                }}
              >
                {userEmail}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center' }}>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {!isAuthenticated && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to={Paths.AUTH} sx={{ textAlign: 'center' }}>
                <ListItemText primary="Log in" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={Paths.REGISTRATION}
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary="Sign up" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes['header-wrapper']}>
        <Stack
          direction="row"
          spacing={{ lg: 23, xs: 8 }}
          sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Link component={NavLink} to="/">
            <Typography
              component="h1"
              sx={{
                fontFamily: 'Josefin Sans',
                fontSize: 21,
                fontWeight: 700,
                lineHeight: 'normal',
                color: 'secondary.main',
                whiteSpace: 'nowrap',
              }}
            >
              FurEver
            </Typography>
          </Link>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: 'none' },
              color: 'secondary.contrastText',
              '&:active': {
                backgroundColor: 'secondary.contrastText' + customIconHoverOpacity,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { md: 'flex', xs: 'none' },
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" spacing={5.5}>
              {Object.entries(navItems).map(([key, value], i) => (
                <Link key={i} component={NavLink} to={key} color="text.primary">
                  {value}
                </Link>
              ))}
            </Stack>
            <Stack direction="row" spacing={4}>
              {isAuthenticated ? (
                <>
                  <Typography
                    sx={{
                      color: 'secondary.contrastText',
                      alignSelf: 'center',
                      marginRight: 2,
                    }}
                    className={classes['user-info']}
                  >
                    {userEmail}
                  </Typography>
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    sx={{ color: 'secondary.contrastText', borderColor: 'secondary.contrastText' }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={NavLink}
                    to={Paths.AUTH}
                    variant="outlined"
                    sx={{ color: 'secondary.contrastText', borderColor: 'secondary.contrastText' }}
                  >
                    Log in
                  </Button>
                  <Button
                    component={NavLink}
                    to={Paths.REGISTRATION}
                    variant="outlined"
                    sx={{ color: 'secondary.contrastText', borderColor: 'secondary.contrastText' }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
      <SwipeableDrawer
        anchor="right"
        variant="temporary"
        open={mobileMenuOpen}
        onOpen={handleDrawerToggle}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </SwipeableDrawer>
    </Box>
  );
}
