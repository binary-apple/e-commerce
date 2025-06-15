import { Box, Button, Typography } from '@mui/material';
import { MAX_PRODUCT_QUANTITY } from '../../constants';
import styles from './QuantitySelector.module.scss';

type Props = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  disabled?: boolean;
};

export function QuantitySelector({ quantity, onQuantityChange, disabled = false }: Props) {
  return (
    <Box className={styles.container}>
      <Button
        size="small"
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={disabled || quantity <= 1}
        sx={{
          minWidth: 24,
          width: 24,
          height: 30,
          p: 0,
          borderRadius: '6px 0 0 6px',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        −
      </Button>

      <Typography
        variant="body2"
        sx={{
          px: 2,
          fontSize: '0.875rem',
          fontWeight: 'medium',
          minWidth: 20,
          textAlign: 'center',
        }}
      >
        {quantity}
      </Typography>

      <Button
        size="small"
        onClick={() => onQuantityChange(quantity + 1)}
        disabled={disabled || quantity >= MAX_PRODUCT_QUANTITY}
        sx={{
          minWidth: 24,
          width: 24,
          height: 30,
          p: 0,
          borderRadius: '0 6px 6px 0',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        +
      </Button>
    </Box>
  );
}
