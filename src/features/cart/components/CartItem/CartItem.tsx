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
import {
  useChangeLineItemQuantityMutation,
  useRemoveLineItemMutation,
} from '../../../../api/cartApi';
import { useSnackbar } from 'notistack';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { useState } from 'react';

type CartItemProps = {
  item: CartLineItem;
  cartId: string;
  cartVersion: number;
};

export default function CartItem({ item, cartId, cartVersion }: CartItemProps) {
  const [removeLineItem, { isLoading: isRemoving }] = useRemoveLineItemMutation();
  const [changeQuantity, { isLoading: isChangingQuantity }] = useChangeLineItemQuantityMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  const handleRemoveItem = async () => {
    try {
      await removeLineItem({
        cartId,
        version: cartVersion,
        lineItemId: item.id,
      }).unwrap();
      enqueueSnackbar('Sticker removed from cart', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to remove sticker', { variant: 'error' });
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem();
      return;
    }

    if (newQuantity === item.quantity) {
      return;
    }

    try {
      await changeQuantity({
        cartId,
        version: cartVersion,
        lineItemId: item.id,
        quantity: newQuantity,
      }).unwrap();
      setLocalQuantity(newQuantity);
      enqueueSnackbar('Quantity updated', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to update quantity', { variant: 'error' });
      setLocalQuantity(item.quantity);
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

  const isLoading = isRemoving || isChangingQuantity;

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
                transition: 'opacity 0.4s ease',
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
        <QuantitySelector
          quantity={localQuantity}
          onQuantityChange={handleQuantityChange}
          disabled={isLoading}
        />
        <Typography variant="body1" sx={{ minWidth: 100 }}>
          {totalPrice} €
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Remove from Cart" arrow>
            <IconButton
              aria-label="remove item"
              onClick={handleRemoveItem}
              disabled={isRemoving}
              color="error"
              sx={{
                transition: 'all 0.4s ease',
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
