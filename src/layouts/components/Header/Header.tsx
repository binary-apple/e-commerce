import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Badge,
  Stack,
  Typography,
  Link,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { navItems, customIconHoverOpacity } from './constants';
import classes from './Header.module.scss';
import { Paths } from '../../../types/paths';
import type { RootState } from '../../../store/store';
import { clearAuth } from '../../../store/slices/authSlice';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../../hooks/useAuth';
import { theme } from '../../../theme';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import { useGetMyActiveCartQuery } from '../../../api/cartApi';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { clearAuthTokenLS } = useAuth();
  const { data: cart } = useGetMyActiveCartQuery();

  let cartCount: number = 0;
  if (cart) {
    cartCount = cart?.lineItems.reduce((total, item) => total + item.quantity, 0);
  }

  const handleLogout = () => {
    clearAuthTokenLS();

    dispatch(clearAuth());

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
      {isInitialized && (
        <List>
          {isAuthenticated && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to={Paths.PROFILE} sx={{ textAlign: 'center' }}>
                  <ListItemText>User Profile</ListItemText>
                </ListItemButton>
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
      )}
    </Box>
  );

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes['header-wrapper']}>
        <Stack
          direction="row"
          spacing={{ lg: 23, xs: 8 }}
          minHeight={62}
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
          <Stack
            spacing={2}
            direction={'row'}
            sx={{
              display: { md: 'none' },
            }}
          >
            <IconButton
              component={NavLink}
              to={Paths.CART}
              sx={{
                color: theme.palette.secondary.contrastText,
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartRoundedIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                color: 'secondary.contrastText',
                '&:active': {
                  backgroundColor: 'secondary.contrastText' + customIconHoverOpacity,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
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
                <Link
                  key={i}
                  component={NavLink}
                  to={key}
                  color="text.primary"
                  sx={{
                    transition: 'all 0.6s ease-in-out',
                    '&:hover': {
                      transition: 'all 0.4s ease-in-out',
                      color: theme.palette.primary.main,
                    },
                    '&.active': {
                      position: 'relative',
                      color: theme.palette.primary.contrastText,
                      cursor: 'default',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '70%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 150,
                        height: 60,
                        background: "url('/svg/active/active-link.svg') center/cover no-repeat",
                        backgroundSize: 150,
                        zIndex: -1,
                      },
                    },
                  }}
                >
                  {value}
                </Link>
              ))}
            </Stack>
            {isInitialized && (
              <Stack
                direction="row"
                alignItems={'center'}
                sx={{
                  gap: { lg: 4, xs: 2 },
                }}
              >
                <IconButton
                  component={NavLink}
                  to={Paths.CART}
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transition: 'all 0.4s ease-in-out',
                    },
                  }}
                >
                  <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCartRoundedIcon fontSize="large" />
                  </Badge>
                </IconButton>
                {isAuthenticated ? (
                  <>
                    <Tooltip title="User Profile" arrow>
                      <Link component={NavLink} to={Paths.PROFILE}>
                        <UserAvatar />
                      </Link>
                    </Tooltip>
                    <Button
                      onClick={handleLogout}
                      variant="outlined"
                      sx={{
                        color: 'secondary.contrastText',
                        borderColor: 'secondary.contrastText',
                      }}
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
                      sx={{
                        color: 'secondary.contrastText',
                        borderColor: 'secondary.contrastText',
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      component={NavLink}
                      to={Paths.REGISTRATION}
                      variant="outlined"
                      sx={{
                        color: 'secondary.contrastText',
                        borderColor: 'secondary.contrastText',
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </Stack>
            )}
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
