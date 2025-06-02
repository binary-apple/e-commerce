import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { openModal, closeModal } from '../../../../store/slices/imageModalSlice';
import EnlargedModal from '../EnlargedModal/EnlargedModal.tsx';
import ShelterSticker from '../../../../components/StickerCreator/ShelterSticker';
import formatDataForSticker from '../../../../utils/formatDataForSticker/formatDataForSticker';
import type { Image, Product } from '../../../../types/productsApi';
import type { RootState } from '../../../../store/store';
import styles from '../../ProductPage.module.scss';
import './ImageSlider.scss';

export default function ImageSlider({ product }: { product: Product }) {
  const images: Image[] = product.masterVariant.images;
  const STICKER = 1;
  const totalSlides: number = images.length + STICKER;
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.imageModal.isOpen);
  const modalStartIndex = useSelector((state: RootState) => state.imageModal.startIndex);
  const slidesData: Array<'sticker' | Image> = ['sticker', ...images];

  const handleSlideClick = (index: number) => {
    dispatch(openModal(index));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        navigation={totalSlides > 1}
        pagination={totalSlides > 1 ? { clickable: true } : false}
        loop={true}
        keyboard={true}
        spaceBetween={100}
        slidesPerView={1}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={styles['card-image-wrapper-item']}
            onClick={() => handleSlideClick(index)}
          >
            {slide === 'sticker' ? (
              <ShelterSticker product={formatDataForSticker(product)} />
            ) : (
              <Box className={styles['card-image-wrapper-item-image']}>
                <img
                  src={slide.url}
                  alt={slide.label || product.name['en-GB'] || 'Product image'}
                />
              </Box>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <EnlargedModal
        open={isModalOpen}
        onClose={handleCloseModal}
        startIndex={modalStartIndex}
        product={product}
      />
    </>
  );
}
