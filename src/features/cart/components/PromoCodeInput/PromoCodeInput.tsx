import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import type { Cart, DiscountCodeInfo } from '../../../../types/cartApi';
import { useAddDiscountCodeMutation, useRemoveDiscountCodeMutation } from '../../../../api/cartApi';
import LocalOffer from '@mui/icons-material/LocalOffer';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';

type Props = {
  cart: Cart;
};

export default function PromoCodeInput({ cart }: Props) {
  const [promoCode, setPromoCode] = useState('');
  const [addDiscountCode, { isLoading: isAdding }] = useAddDiscountCodeMutation();
  const [removeDiscountCode, { isLoading: isRemoving }] = useRemoveDiscountCodeMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleApplyPromoCode = async () => {
    const currentCode = promoCode.trim().toUpperCase();

    if (!currentCode) {
      enqueueSnackbar('Please enter a promo code', { variant: 'warning' });
      return;
    }

    const isAlreadySuccessfullyApplied = cart.discountCodes?.some(
      (discount) =>
        discount.discountCode.obj.code === currentCode && discount.state === 'MatchesCart',
    );

    if (isAlreadySuccessfullyApplied) {
      enqueueSnackbar('This promo code is already applied', { variant: 'info' });
      return;
    }

    try {
      const result = await addDiscountCode({
        cartId: cart.id,
        version: cart.version,
        code: currentCode,
      }).unwrap();

      const appliedDiscounts = result.discountCodes;
      const lastIndex = result.discountCodes ? result.discountCodes.length - 1 : null;

      if (!appliedDiscounts || lastIndex === null) {
        enqueueSnackbar('Promo code processed, but no discounts found', {
          variant: 'warning',
        });
        setPromoCode('');
        return;
      }
      const lastAppliedDiscount = appliedDiscounts[lastIndex];

      if (!lastAppliedDiscount) {
        enqueueSnackbar('Unable to determine promo code status', {
          variant: 'warning',
        });
        setPromoCode('');
        return;
      }

      switch (lastAppliedDiscount.state) {
        case 'DoesNotMatchCart': {
          enqueueSnackbar('This promo code cannot be applied to your current cart items', {
            variant: 'warning',
            autoHideDuration: 5000,
          });

          break;
        }
        case 'MaxApplicationReached': {
          enqueueSnackbar('This promo code has reached its usage limit', {
            variant: 'warning',
            autoHideDuration: 5000,
          });

          break;
        }
        case 'MatchesCart': {
          enqueueSnackbar('Promo code applied successfully!', {
            variant: 'success',
            autoHideDuration: 4000,
          });

          break;
        }
      }

      setPromoCode('');
    } catch {
      enqueueSnackbar('Failed to apply promo code', { variant: 'error' });
    }
  };

  const handleRemovePromoCode = async (codeInfo: DiscountCodeInfo) => {
    try {
      await removeDiscountCode({
        cartId: cart.id,
        version: cart.version,
        discountCodeId: codeInfo.discountCode.id,
      }).unwrap();

      enqueueSnackbar('Promo code removed', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch {
      enqueueSnackbar('Failed to remove promo code', { variant: 'error' });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleApplyPromoCode();
    }
  };

  const isLoading = isAdding || isRemoving;

  const matchingPromoCodes =
    cart.discountCodes?.filter((discount) => discount.state === 'MatchesCart') || [];

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
          onKeyUp={handleKeyPress}
          disabled={isLoading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOffer color="action" fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& input': {
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '1px',
              },
            },
          }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleApplyPromoCode}
          disabled={!promoCode.trim() || isLoading}
          startIcon={isAdding ? <CircularProgress size={16} color="inherit" /> : <Add />}
          sx={{ minWidth: 100 }}
        >
          Apply
        </Button>
      </Box>

      {cart.discountCodes && matchingPromoCodes.length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
            Applied Promo Codes:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {matchingPromoCodes.map((discountCodeInfo) => (
              <Chip
                key={discountCodeInfo.discountCode.id}
                label={discountCodeInfo.discountCode.obj.code}
                variant="outlined"
                onDelete={() => handleRemovePromoCode(discountCodeInfo)}
                deleteIcon={isRemoving ? <CircularProgress size={16} /> : <Close />}
                disabled={isLoading}
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  '& .MuiChip-deleteIcon': {
                    fontSize: '16px',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
