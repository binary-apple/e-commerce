import Box from '@mui/material/Box';
import WhyWeCareSection from './components/WhyWeCareSection/WhyWeCareSection';

export default function MainPage() {
  return (
    <Box maxWidth={{ lg: '1108px', md: '850px', xs: '90%' }} m="auto">
      <WhyWeCareSection />
    </Box>
  );
}
