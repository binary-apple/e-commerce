import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import ShelterSticker from '../../../../components/StickerCreator/ShelterSticker';
import formatDataForSticker from '../../../../utils/formatDataForSticker/formatDataForSticker';
import type { Image, Product } from '../../../../types/productsApi';
import styles from './EnlargedModal.module.scss';

export default function EnlargedModal({
  open,
  onClose,
  startIndex,
  product,
}: {
  open: boolean;
  onClose: () => void;
  startIndex: number;
  product: Product;
}) {
  const images: Image[] = product.masterVariant.images;
  const slidesData: Array<'sticker' | Image> = ['sticker', ...images];

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles['slider-modal']}>
        <IconButton
          className={styles['slider-modal-close']}
          sx={{
            position: 'absolute',
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Swiper
          modules={[Navigation, Keyboard]}
          navigation
          keyboard
          initialSlide={startIndex}
          slidesPerView={1}
          spaceBetween={50}
          className={styles['slider-modal-swiper']}
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide className={styles['slider-modal-swiper-item']} key={`modal-${index}`}>
              {slide === 'sticker' ? (
                <Box
                  className={styles['slider-modal-swiper-item-sticker']}
                  sx={{ display: 'flex' }}
                >
                  <ShelterSticker product={formatDataForSticker(product)} />
                </Box>
              ) : (
                <img
                  src={slide.url}
                  alt={slide.label || product.name['en-GB']}
                  className={styles['slider-modal-swiper-item-image']}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Modal>
  );
}
