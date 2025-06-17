import { Box, CircularProgress, Container, Grid, Link } from '@mui/material';
import Title from '../../components/Title/Title';
import styles from './CartPage.module.scss';
import bowlImage from '/bowl.png';
import { Link as RouterLink } from 'react-router';
import { Paths } from '../../types/paths';
import { useClearCartMutation, useGetMyActiveCartQuery } from '../../api/cartApi';
import CartItem from './components/CartItem/CartItem';
import { CartSummary } from './components/CartSummary/CartSummary';
import { enqueueSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useState } from 'react';

export default function CartPage() {
  const { data: cart, isLoading } = useGetMyActiveCartQuery();
  const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();
  const [isClearDisabled, setIsClearDisabled] = useState(false);

  const handleClearCart = async () => {
    setIsClearDisabled(true);

    if (!cart) return;

    try {
      await clearCart({ cartId: cart.id, version: cart.version }).unwrap();
      enqueueSnackbar('Your cart cleared successfully!', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to clear the cart', { variant: 'error' });
      setIsClearDisabled(false);
    }
  };

  if (isLoading) {
    return <CircularProgress size="3rem" />;
  }

  if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
    return (
      <Container
        sx={{
          paddingX: {
            xs: '16px',
            sm: '100px',
            md: '150px',
          },
          paddingY: {
            xs: '30px',
            sm: '60px',
          },
        }}
        className={styles.container}
      >
        <Title title="Empty cart = sad shelter animals!" variant="h3" />
        <Title title="Fill your cart to fill their bowls." variant="h3" />
        <Link
          component={RouterLink}
          variant="h3"
          to={Paths.CATALOG}
          color="primary"
          sx={{
            textDecoration: 'underline',
            transition: 'color 0.3s',
            '&:hover': {
              color: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          Go to Catalog
        </Link>
        <img src={bowlImage} className={styles.image} alt="empty bowl" />
      </Container>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
        paddingY: {
          xs: '30px',
          sm: '60px',
        },
      }}
      className={styles.cart}
    >
      <Grid
        container
        sx={{ minWidth: '100%', gap: { xs: 1, md: 4 }, flexWrap: { xs: 'wrap', md: 'nowrap' } }}
        className={styles['cart-wrapper']}
      >
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              marginBottom: {
                xs: '0.5rem',
                md: '1rem',
              },
            }}
            className={styles['cart-header']}
          >
            <Title title="Your Cart" variant="h3" />
            <Button
              color="error"
              startIcon={<DeleteForeverOutlinedIcon />}
              onClick={handleClearCart}
              disabled={isClearDisabled}
            >
              {isClearingCart ? 'Clearing...' : 'Clear Cart'}
            </Button>
          </Box>
          <Box>
            {!isClearDisabled &&
              cart.lineItems.map((item) => (
                <CartItem item={item} key={item.id} cartId={cart.id} cartVersion={cart.version} />
              ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} className={styles.summary}>
          <Title title="Order Summary" variant="h3" />
          <CartSummary cart={cart} />
        </Grid>
      </Grid>
    </Box>
  );
}
