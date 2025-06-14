import { Typography, ListItem, ListItemAvatar, ListItemText, Divider, Box } from '@mui/material';
import type { CartLineItem } from '../../../../types/cartApi';
import { formatPrice } from '../../../../utils/formatPrice/formatPrice';
import ShelterSticker from '../../../../components/StickerCreator/ShelterSticker';
import { NavLink } from 'react-router';
import { Paths } from '../../../../types/paths';

type CartItemProps = {
  item: CartLineItem;
  // TODO when update cart
  // cartId: string;
  // cartVersion: number;
};

export default function CartItem({ item }: CartItemProps) {
  const getProductImage = () => {
    return item.variant?.images?.[0]?.url || '/placeholder-image.png';
  };

  const individualPrice = formatPrice(item.price.discounted?.value || item.price.value);

  const totalPrice = formatPrice(item.totalPrice);

  const stickerInfo = {
    name: item.name['en-GB'],
    image: getProductImage(),
    color:
      item.variant.attributes.find((attribute) => attribute.name === 'color')?.value.key ||
      'color-cheap',
  };

  return (
    <>
      <ListItem sx={{ gap: 3, backgroundColor: '#FBF2DA' }}>
        <ListItemAvatar>
          <Box sx={{ width: 100, height: 100 }}>
            <Box
              component={NavLink}
              to={`${Paths.PRODUCT}/${item.productKey}`}
              sx={{
                width: 100,
                height: 100,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <ShelterSticker product={stickerInfo} />
            </Box>
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={item.name['en-GB'] || 'Product Name'}
          secondary={`${individualPrice} €`}
        />
        <Typography variant="body1">{item.quantity} item</Typography>
        <Typography variant="body1">{totalPrice} €</Typography>
      </ListItem>
      <Divider sx={{ mb: 2 }} />
    </>
  );
}
