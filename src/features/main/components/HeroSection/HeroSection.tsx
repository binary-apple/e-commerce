import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import arrowCurly from '../../../../assets/images/ArrowCurly.svg';
import mainPageDog from '../../../../assets/images/MainPageDog.png';
import Button from '@mui/material/Button';
import classes from './HeroSection.module.scss';
import heroContent from './constants';

export default function HeroSection() {
  return (
    <Box component="section" width="100%" flexGrow="1" className={classes.section}>
      <Box
        component="div"
        className={classes['section-wrapper']}
        sx={{
          maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          margin: 'auto',
          py: { lg: 13, md: 8, xs: 4 },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1.5}>
          <Box component="div">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="start"
              gap={1.5}
              sx={{ marginLeft: { sm: 3.5, xs: 0.5 }, marginBottom: { md: 3.5, xs: 0.5 } }}
            >
              <Box
                component="img"
                src={arrowCurly}
                alt=""
                sx={{
                  width: {
                    xs: '30px',
                    sm: '50px',
                    md: '62px',
                  },
                  height: 'auto',
                }}
              />
              <Typography
                variant="subtitle2"
                color="info"
                fontWeight={700}
                letterSpacing="-1px"
                sx={{
                  fontSize: { md: 24, xs: 13 },
                  marginBottom: { md: 3.5, xs: 1 },
                }}
              >
                {heroContent.subtitle2}
              </Typography>
            </Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { lg: 94, md: 56, sm: 38, xs: 24 },
                color: 'secondary',
                textTransform: 'uppercase',
                fontFamily: 'Josefin Sans',
                letterSpacing: { md: '-5px', sx: '-1px' },
                fontWeight: 700,
                textAlign: 'center',
                lineHeight: 1,
              }}
            >
              <Box component="span">{heroContent.title.start}</Box>
              <br />
              <Box component="span" color="primary.main">
                {heroContent.title.end}
              </Box>
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              marginBottom={4}
              sx={{ fontSize: { md: 24, xs: 12 } }}
            >
              {heroContent.subtitle}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                const element = document.querySelector('#why-we-care');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heroContent.buttonLabel}
            </Button>
          </Box>
          <Box
            component="img"
            src={mainPageDog}
            alt="Dog"
            sx={{
              width: { lg: 396, md: 360, sm: 200, xs: 130 },
              height: 'auto',
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
}
