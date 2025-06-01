import { NavLink } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { CardActions } from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import type { ProductCardConfig } from '../../../../types/product';
import ShelterSticker from '../../../../components/StickerCreator/ShelterSticker';
import styles from './ProductCard.module.scss';

const handleAddToCart = (event: React.MouseEvent, product: ProductCardConfig) => {
  event.preventDefault();
  //todo: implement logic of adding sticker to cart
  event.stopPropagation();
  if (product) return;
};

export default function ProductCard({ product }: { product: ProductCardConfig }) {
  return (
    <Card
      className={styles.card}
      key={product.key}
      component={NavLink}
      to={`/product/${product.key}`}
    >
      <Box className={styles['card-sticker']}>
        <ShelterSticker product={product} />
      </Box>
      <CardContent
        className={styles['card-content']}
        sx={{
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Typography variant="h6" color="text.primary" lineHeight={1}>
          {product.place}
        </Typography>
        <Typography variant="body2" className={styles['card-text-description']}>
          {product.description}
        </Typography>
        <Box className={styles['card-price-row']}>
          <Box className={styles['card-price']}>
            <Typography variant="h6" color="text.secondary">
              {product.price}
            </Typography>
            <Typography variant="h6">{product.currencyCode}</Typography>
          </Box>
          <CardActions
            sx={{
              p: 0,
            }}
          >
            <IconButton
              aria-label="add to cart"
              className={styles['card-add-to-cart']}
              onClick={(event: React.MouseEvent) => {
                handleAddToCart(event, product);
              }}
            >
              <AddShoppingCartRoundedIcon />
            </IconButton>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
}
