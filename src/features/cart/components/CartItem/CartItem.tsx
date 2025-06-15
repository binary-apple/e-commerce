import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import type { CartLineItem } from '../../../../types/cartApi';
import { formatPrice } from '../../../../utils/formatPrice/formatPrice';
import ShelterSticker from '../../../../components/StickerCreator/ShelterSticker';
import { NavLink } from 'react-router';
import { Paths } from '../../../../types/paths';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useRemoveLineItemMutation } from '../../../../api/cartApi';
import { useSnackbar } from 'notistack';

type CartItemProps = {
  item: CartLineItem;
  cartId: string;
  cartVersion: number;
};

export default function CartItem({ item, cartId, cartVersion }: CartItemProps) {
  const [removeLineItem, { isLoading: isRemoving }] = useRemoveLineItemMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveItem = async () => {
    try {
      await removeLineItem({
        cartId,
        version: cartVersion,
        lineItemId: item.id,
      }).unwrap();
      enqueueSnackbar('Item removed from cart', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to remove item', { variant: 'error' });
    }
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Remove from Cart" arrow>
            <IconButton
              aria-label="remove item"
              onClick={handleRemoveItem}
              disabled={isRemoving}
              color="error"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'error.contrastText',
                },
              }}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </ListItem>
      <Divider sx={{ mb: 2 }} />
    </>
  );
}
