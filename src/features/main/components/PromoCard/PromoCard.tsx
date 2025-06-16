import { Box, Card, CardContent, Chip, IconButton, Typography } from '@mui/material';
import type { PromoCode } from '../../../../types/promoCodesApi';
import { useSnackbar } from 'notistack';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { theme } from '../../../../theme';
import styles from './PromoCard.module.scss';

type Props = {
  promoCode: PromoCode;
};

export default function PromoCard({ promoCode }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(promoCode.code);
      enqueueSnackbar('Promo code copied!', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to copy code', { variant: 'error' });
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '32px',
        width: {
          md: '50%',
        },
      }}
    >
      <CardContent sx={{ p: 3 }} className={styles['card-content']}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {promoCode.name['en-GB'] || promoCode.name.en}
        </Typography>

        <Typography variant="h6" component="div" sx={{ mb: 3, flexGrow: 1 }}>
          {promoCode.description?.['en-GB']}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={promoCode.code}
            variant="outlined"
            size="medium"
            sx={{
              color: theme.palette.primary.contrastText,
              borderColor: 'rgba(255,255,255,0.5)',
              fontWeight: 'bold',
              fontSize: 18,
              letterSpacing: 2,
              p: 3,
            }}
          />
          <IconButton size="small" onClick={handleCopyCode} sx={{ color: 'white' }}>
            <CopyIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
