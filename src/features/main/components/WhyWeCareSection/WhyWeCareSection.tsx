import Box from '@mui/material/Box';
import DetailsCard from '../DetailsCard/DetailsCard';
import { cardsData, title } from './constants';
import Title from '../../../../components/Title/Title';

export default function WhyWeCareSection() {
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 12 }}>
      <Title title={title} />
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, gap: 2 }}
      >
        {cardsData.map(({ title, imgUrl, text, isBg: bgImg }, i) => (
          <DetailsCard key={i} title={title} imgUrl={imgUrl} text={text} isBg={bgImg} />
        ))}
      </Box>
    </Box>
  );
}
