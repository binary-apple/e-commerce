import { theme } from '../../theme.ts';
import { stickerBackgroundColor } from './stickerBackgroundColors.ts';

const DEFAULT_IMAGE_SIZE = 300;

type StickerInfo = {
  name: string;
  image: string;
  color: string;
};

//todo: if response of image request starts with 4** - fix with static image for this element, maybe use OopsBox
export default function ShelterSticker<T extends StickerInfo>({
  product,
  size = DEFAULT_IMAGE_SIZE,
}: {
  product: T;
  size?: number;
}) {
  const TWO = 2;
  const CENTER = size / TWO;
  const BORDER_RADIUS = 28;

  const PADDING_COEFFICIENT = 0.1;
  const IMAGE_COEFFICIENT = 0.9;
  const IMAGE_OFFSET_Y = 0.75;
  const TEXT_WIDTH_COEFFICIENT = 0.9;

  const FONT_COEFFICIENT = 0.08;
  const TEXT_BLOCK_COEFFICIENT = 2.2;

  const stickerPadding = size * PADDING_COEFFICIENT;
  const imageHeight = size * IMAGE_COEFFICIENT;

  const imageY = size - imageHeight * IMAGE_OFFSET_Y;
  const imageX = CENTER - imageHeight / TWO;

  const fontSize = size * FONT_COEFFICIENT;
  const textBlockWidth = size * TEXT_WIDTH_COEFFICIENT;
  const textBlockHeight = fontSize * TEXT_BLOCK_COEFFICIENT;

  const textY: number = stickerPadding;
  const textX: number = CENTER - textBlockWidth / TWO;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="stickerClip">
          <rect width={size} height={size} rx={BORDER_RADIUS} ry={BORDER_RADIUS} />
        </clipPath>
      </defs>

      <g clipPath="url(#stickerClip)">
        <rect
          width={size}
          height={size}
          rx={BORDER_RADIUS}
          ry={BORDER_RADIUS}
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
      </g>
    </svg>
  );
}
