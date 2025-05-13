import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import spotsBg from '../../../assets/images/SpotsBg.svg';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          py: 10,
          maxWidth: { lg: '1108px', md: '850px', xs: '350px' },
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundImage: `url("${spotsBg}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: {
            lg: 'left 36% top 84%',
            md: 'left 25% top 84%',
            xs: 'right -50% bottom 13%',
          },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Josefin Sans',
            fontSize: { lg: 60, xs: 45 },
            fontWeight: 700,
            lineHeight: 'normal',
            color: 'primary.main',
            pb: { md: '0', xs: '50px' },
          }}
        >
          Pet-First
        </Typography>
        <Typography
          component="div"
          color="secondary.contrastText"
          fontFamily="Josefin Sans"
          fontWeight={600}
        >
          <Stack direction={{ md: 'column', xs: 'row' }} spacing={{ md: 4, xs: 8 }}>
            {/* //TODO: move footer links to a separate component */}
            <Stack direction={{ md: 'row', xs: 'column' }} spacing={4}>
              <Link color="secondary.contrastText">About</Link>
              <Link color="secondary.contrastText">Project</Link>
              <Link color="secondary.contrastText">Service</Link>
              <Link color="secondary.contrastText">Client</Link>
              <Link color="secondary.contrastText">Team</Link>
              <Link color="secondary.contrastText">Blog</Link>
              <Link color="secondary.contrastText">Contact</Link>
            </Stack>
            <Stack
              direction={{ md: 'row', xs: 'column' }}
              spacing={{ md: 4, xs: 2 }}
              alignItems="center"
            >
              <div>Follow:</div>
              <Stack direction={{ md: 'row', xs: 'column' }} spacing={1.5}>
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  color="secondary.contrastText"
                >
                  <FacebookIcon fontSize="large"></FacebookIcon>
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  color="secondary.contrastText"
                >
                  <InstagramIcon fontSize="large"></InstagramIcon>
                </Link>
                <Link href="https://x.com/" target="_blank" color="secondary.contrastText">
                  <XIcon fontSize="large"></XIcon>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Typography>
      </Box>
    </Box>
  );
}
