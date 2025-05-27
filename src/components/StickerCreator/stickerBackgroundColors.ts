import type { ProductConfig } from '../../types/product.ts';
import { theme } from '../../theme.ts';
export const stickerBackgroundColor: Record<ProductConfig['color'], string> = {
  'color-cheap': theme.palette.warning.main,
  'color-average': theme.palette.info.main,
  'color-expensive': theme.palette.primary.main,
};
