import type { ProductCardConfig } from '../../types/preparedProductData.ts';
import { theme } from '../../theme.ts';

export const stickerBackgroundColor: Record<ProductCardConfig['color'], string> = {
  'color-cheap': theme.palette.warning.main,
  'color-average': theme.palette.info.main,
  'color-expensive': theme.palette.primary.main,
};
