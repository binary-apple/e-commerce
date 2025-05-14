import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import headerBg from '../../../assets/images/HeaderBg.svg';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3.5,
          mx: 'auto',
          '&::after': {
            content: '""',
            position: 'absolute',
            height: '100%',
            top: 0,
            right: 0,
            width: {
              lg: 'calc(50% - 1108px * 0.3)',
              md: 'calc(50% - 850px * 0.3)',
              xs: 'calc(50% - 350px * 0.3)',
            },
            bgcolor: 'secondary.main',
            zIndex: -1,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            height: '100%',
            width: '130px',
            top: 0,
            right: {
              lg: 'calc(50% - 1108px * 0.39)',
              md: 'calc(50% - 850px * 0.36)',
              xs: 'calc(50% - 350px * 0.5)',
            },
            backgroundImage: `url("${headerBg}")`,
            zIndex: -1,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={{ md: 23, xs: 8 }}
          sx={{ width: '100%', alignItems: 'center' }}
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
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
          >
            <Stack direction="row" spacing={5.5}>
              <Link color="text.primary">Main</Link>
              <Link color="text.primary">Catalog</Link>
              <Link color="text.primary">About us</Link>
            </Stack>
            <Stack direction="row" spacing={5.5}>
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
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
