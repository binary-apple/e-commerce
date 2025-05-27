import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { CardActions } from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import type { ProductCardConfig } from '../../types/product.ts';
import ShelterSticker from '../../components/StickerCreator/ShelterSticker.tsx';
import styles from './ProductCard.module.scss';

const priceSymbol: string = '€';

const handleAddToCart = (event: React.MouseEvent, product: ProductCardConfig) => {
  //todo: implement logic of adding sticker to cart
  event.stopPropagation();
  console.log('Added to cart:', product);
};

export default function ProductCard({ product }: { product: ProductCardConfig }) {
  return (
    <Card
      className={styles.card}
      sx={{
        borderRadius: '36px',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 6,
        },
      }}
    >
      <Box className={styles['card-sticker']}>
        <ShelterSticker product={product} size={237} />
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
            <Typography variant="h6">{priceSymbol}</Typography>
          </Box>
          <CardActions
            sx={{
              p: 0,
            }}
          >
            <IconButton
              aria-label="add to cart"
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
