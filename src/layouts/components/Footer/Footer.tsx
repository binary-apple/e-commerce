import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import spotsBg from '../../../assets/images/SpotsBg.svg';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from '@mui/material/Link';
import SchoolIcon from '../RSScoolLogoIcon/SchoolLogoIcon';

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
          FurEver
        </Typography>
        <Typography
          component="div"
          color="secondary.contrastText"
          fontFamily="Josefin Sans"
          fontWeight={600}
        >
          <Stack direction={{ md: 'column', xs: 'row' }} spacing={{ md: 4, xs: 8 }}>
            <Stack direction={{ md: 'row', xs: 'column' }} spacing={{ md: 4, xs: 2 }}>
              <Typography variant="inherit">Developed by:</Typography>
              <Stack direction={{ md: 'row', xs: 'column' }} spacing={4} alignItems="center">
                <Link
                  href="https://github.com/tanykos"
                  target="_blank"
                  color="secondary.contrastText"
                >
                  <Typography variant="inherit">tanykos</Typography>
                </Link>
                <Link
                  href="https://github.com/montaana01"
                  target="_blank"
                  color="secondary.contrastText"
                >
                  <Typography variant="inherit">montaana01</Typography>
                </Link>
                <Link
                  href="https://github.com/binary-apple"
                  target="_blank"
                  color="secondary.contrastText"
                >
                  <Typography variant="inherit">binary-apple</Typography>
                </Link>
              </Stack>
            </Stack>
            <Stack
              direction={{ md: 'row', xs: 'column' }}
              spacing={{ md: 4, xs: 2 }}
              alignItems="center"
            >
              <Typography variant="inherit">Follow RS School:</Typography>
              <Stack direction={{ md: 'row', xs: 'column' }} spacing={1.5}>
                <Link href="https://rs.school/" target="_blank">
                  <SchoolIcon fontSize="large" color="secondary" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/the-rolling-scopes-school/"
                  target="_blank"
                  color="secondary.contrastText"
                >
                  <LinkedInIcon fontSize="large"></LinkedInIcon>
                </Link>
                <Link
                  href="https://www.facebook.com/rsschoolEN"
                  target="_blank"
                  color="secondary.contrastText"
                >
                  <FacebookIcon fontSize="large"></FacebookIcon>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Typography>
      </Box>
    </Box>
  );
}
