import { Box, Button, Typography } from '@mui/material';
import { formatPrice } from '../../../../utils/formatPrice/formatPrice';
import type { Cart } from '../../../../types/cartApi';
import { useSnackbar } from 'notistack';

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

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="h6">
          {totalItems} sticker{totalItems === 1 ? '' : 's'}
        </Typography>
        <Typography variant="h6" color="primary">
          {formatPrice(totalCost)} €
        </Typography>
      </Box>

      <Button variant="contained" fullWidth onClick={handleCheckout}>
        Checkout
      </Button>
    </>
  );
}
