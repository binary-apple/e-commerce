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

// TODO: get isAuthenticated from localStorage or state
const isAuthenticated = false;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen((previousState) => !previousState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        )}
        {!isAuthenticated && (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary="Log in" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
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
          <Link href="/">
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
              Pet-First
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
              {navItems.map((item) => (
                <Link key={item} color="text.primary">
                  {item}
                </Link>
              ))}
            </Stack>
            <Stack direction="row" spacing={4}>
              <Button
                variant="outlined"
                sx={{ color: 'secondary.contrastText', borderColor: 'secondary.contrastText' }}
              >
                Log in
              </Button>
              <Button
                variant="outlined"
                sx={{ color: 'secondary.contrastText', borderColor: 'secondary.contrastText' }}
              >
                Sign up
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: 'secondary.contrastText',
                  borderColor: 'secondary.contrastText',
                  display: 'none',
                }}
              >
                Log out
              </Button>
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
