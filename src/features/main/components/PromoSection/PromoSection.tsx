import Box from '@mui/material/Box';
import Title from '../../../../components/Title/Title';
import styles from './PromoSection.module.scss';
import { useGetActivePromoCodesQuery } from '../../../../api/promoCodesApi';
import PromoCard from '../PromoCard/PromoCard';
import { CircularProgress } from '@mui/material';

export default function PromoSection() {
  const { data: promoCodes, isLoading } = useGetActivePromoCodesQuery();

  if (isLoading) {
    return <CircularProgress size="3rem" />;
  }

  return (
    <Box component="section" className={styles.section} bgcolor="primary.main" id="promo">
      <Box
        component="div"
        sx={{
          maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          margin: 'auto',
          py: { lg: 13, md: 8, xs: 4 },
        }}
      >
        <Title title="Promo Codes" />
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { md: 'row', xs: 'column' },
            gap: 4,
          }}
        >
          {promoCodes && promoCodes.map((code) => <PromoCard key={code.key} promoCode={code} />)}
        </Box>
      </Box>
    </Box>
  );
}
