import { Navigate, useParams } from 'react-router';
import { useGetProductByKeyQuery } from '../../api/productsApi';
import { Grid, CardContent, Typography, Box, Button, Stack, Chip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Paths } from '../../types/paths.ts';
import styles from './ProductPage.module.scss';
import { formatPrice } from '../../utils/formatPrice/formatPrice';
import ImageSlider from './components/ImageSlider/ImageSlider';
import { useAddToCart } from '../../hooks/useAddToCart.ts';
import { useGetMyActiveCartQuery } from '../../api/cartApi.ts';
import { isProductInCart } from '../../utils/isProductInCart.ts';
import { useEffect, useState } from 'react';
import { useRemoveFromCart } from '../../hooks/useRemoveFromCart.ts';

export default function ProductPage() {
  const { key } = useParams();
  const {
    data,
    isLoading: isProductLoading,
    isError,
    error,
  } = useGetProductByKeyQuery({ key: key! }, { skip: !key });
  const { data: cart } = useGetMyActiveCartQuery();
  const { addToCart } = useAddToCart(cart);
  const { removeFromCart } = useRemoveFromCart(cart);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<string>(
    isProductInCart(data?.id ?? '', cart) ? 'Remove' : 'Add to cart',
  );
  useEffect(() => {
    setIsButtonDisabled(false);
    setButtonLabel(isProductInCart(data?.id ?? '', cart) ? 'Remove' : 'Add to cart');
  }, [cart, data?.id]);
  if (isProductLoading) {
    return <CircularProgress size="3rem" />;
  }
  if (isError) {
    return <Box className={styles['card']}>Error {JSON.stringify(error)}</Box>;
  }
  if (!data) return <Navigate to={Paths.NOT_FOUND} replace />;

  const handleClick = async (id: string) => {
    setIsButtonDisabled(true);
    if (isProductInCart(id, cart)) {
      try {
        await removeFromCart(id);
      } catch {
        setIsButtonDisabled(false);
      }
    } else {
      try {
        await addToCart(id);
      } catch {
        setIsButtonDisabled(false);
      }
    }
  };

  const priceObject = data.masterVariant.prices[0];

  const formattedPrice: string = formatPrice(priceObject.value);
  const CODE: string = priceObject.value.currencyCode;

  const hasDiscount = Boolean(priceObject.discounted);

  let formattedSalePrice: string | null = null;
  if (hasDiscount) {
    formattedSalePrice = formatPrice(priceObject.discounted!.value);
  }

  const petTypeAttribute = data.masterVariant.attributes.find(
    (attribute) => attribute.name === 'shelter-pets',
  );
  const petLabelsValue = petTypeAttribute?.value;
  const petLabels =
    typeof petLabelsValue === 'string' ? String(petLabelsValue).split(';') : ['other'];
  return (
    <Box component="div" className={styles['card']}>
      <Grid className={styles['card-grid']}>
        {hasDiscount && <Box className="urgent">Urgent!</Box>}
        <Box className={styles['card-image-wrapper']}>
          <ImageSlider product={data} />
        </Box>

        <CardContent className={styles['card-content']} sx={{ p: 0 }}>
          <Box>
            <Typography variant="h4" component="h2" color="text.secondary" gutterBottom>
              {data.name['en-GB']}
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              {data.description['en-GB']}
            </Typography>
            <Stack direction="row" gap={1} paddingTop={2} flexWrap={'wrap'}>
              {petLabels.map((label, index) => (
                <Chip
                  key={index}
                  className={styles['card-label']}
                  label={label}
                  color="secondary"
                  size="small"
                />
              ))}
            </Stack>
          </Box>
          <Box className={styles['card-bottom']}>
            <Box className={styles['card-bottom-price']}>
              {hasDiscount ? (
                <>
                  <Typography variant="h6">
                    <s>
                      {formattedPrice} {CODE}
                    </s>
                  </Typography>
                  <Typography variant="h5" className={styles['card-bottom-price-sale']}>
                    {formattedSalePrice} {CODE}
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" color="primary">
                  {formattedPrice} {CODE}
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClick(data.id)}
              disabled={isButtonDisabled}
              sx={{ minWidth: '190px' }}
            >
              {buttonLabel}
            </Button>
          </Box>
        </CardContent>
      </Grid>
    </Box>
  );
}
