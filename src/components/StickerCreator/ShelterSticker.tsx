import type { ProductConfig } from '../../types/product.ts';
import { theme } from '../../theme.ts';
import { stickerBackgroundColor } from './stickerBackgroundColors.ts';

const defaultImageSize = 300;
//todo: if response of image request starts with 4** - fix with static image for this element, maybe use OopsBox
export default function ShelterSticker({
  product,
  size = defaultImageSize,
}: {
  product: ProductConfig;
  size: number;
}) {
  const two = 2;
  const center = size / two;

  const paddingCoefficient = 0.1;
  const imageCoefficient = 0.6;
  const textWidthCoefficient = 0.9;

  const fontCoefficient = 0.08;
  const textBlockHeightCoefficient = 2.2;

  const stickerPadding = size * paddingCoefficient;
  const imageHeight = size * imageCoefficient;

  const imageY = size - imageHeight - stickerPadding;
  const imageX = center - imageHeight / two;

  const fontSize = size * fontCoefficient;
  const textBlockWidth = size * textWidthCoefficient;
  const textBlockHeight = fontSize * textBlockHeightCoefficient;

  const textY: number = stickerPadding;
  const textX: number = center - textBlockWidth / two;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        cx={center}
        cy={center}
        width={size}
        height={size}
        rx={36}
        fill={stickerBackgroundColor[product.color]}
      />
      <foreignObject x={textX} y={textY} width={textBlockWidth} height={textBlockHeight}>
        <div
          title={product.name}
          style={{
            wordWrap: 'break-word',
            fontSize: `${fontSize}px`,
            color: theme.palette.background.paper,
            fontWeight: 'bold',
            textAlign: 'center',
            height: '100%',
            lineHeight: 1,
          }}
        >
          {product.name}
        </div>
      </foreignObject>
      <image
        href={product.image}
        x={imageX}
        y={imageY}
        width={imageHeight}
        height={imageHeight}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
