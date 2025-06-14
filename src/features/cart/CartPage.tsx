import { Box, CircularProgress, Container, Grid, Link } from '@mui/material';
import Title from '../../components/Title/Title';
import styles from './CartPage.module.scss';
import bowlImage from '/bowl.png';
import { Link as RouterLink } from 'react-router';
import { Paths } from '../../types/paths';
import { useGetMyActiveCartQuery } from '../../api/cartApi';
import CartItem from './components/CartItem/CartItem';

export default function CartPage() {
  const { data: cart, isLoading } = useGetMyActiveCartQuery();

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
          >
            <Title title="Your Cart" variant="h3" />
          </Box>
          <Box>
            {cart.lineItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} className={styles.summary}>
          <Title title="Order Summary" variant="h3" />
          {/* TODO Total cart info */}
          {/* <CartSummary cart={cart} /> */}
        </Grid>
      </Grid>
    </Box>
  );
}
