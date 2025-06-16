import { Box, Button, Typography } from '@mui/material';
import { formatPrice, sumFormatPrice } from '../../../../utils/formatPrice/formatPrice';
import type { Cart } from '../../../../types/cartApi';
import { useSnackbar } from 'notistack';
import PromoCodeInput from '../PromoCodeInput/PromoCodeInput';

export function CartSummary({ cart }: { cart: Cart }) {
  const { enqueueSnackbar } = useSnackbar();
  const totalItems = cart.lineItems.reduce((total, item) => total + item.quantity, 0);
  const totalCost = cart.totalPrice;

  const handleCheckout = () => {
    enqueueSnackbar('The shelter animals are grateful!', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      autoHideDuration: 3000,
    });
  };

  const getSubtotal = () => {
    const discountPrice = cart.discountOnTotalPrice?.discountedAmount || '';
    if (discountPrice) {
      return sumFormatPrice(totalCost, discountPrice);
    }
    return formatPrice(totalCost);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="h6">
          {totalItems} sticker{totalItems === 1 ? '' : 's'}
        </Typography>
        <Typography variant="h6" color="primary">
          {getSubtotal()} €
        </Typography>
      </Box>

      <PromoCodeInput cart={cart} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Total
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          {formatPrice(totalCost)} €
        </Typography>
      </Box>

      <Button variant="contained" fullWidth onClick={handleCheckout}>
        Checkout
      </Button>
    </>
  );
}
