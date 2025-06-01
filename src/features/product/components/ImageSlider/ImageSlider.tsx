import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import ShelterSticker from '../../../../components/StickerCreator/ShelterSticker';
import formatDataForSticker from '../../../../utils/formatDataForSticker/formatDataForSticker';
import type { Image, Product } from '../../../../types/productsApi';
import styles from '../../ProductPage.module.scss';
import './ImageSlider.scss';

export default function ImageSlider({ product }: { product: Product }) {
  const images: Image[] = product.masterVariant.images;
  const STICKER = 1;
  const totalSlides: number = images.length + STICKER;

  return (
    <Swiper
      modules={[Navigation, Pagination, Keyboard, Autoplay]}
      navigation={totalSlides > 1}
      pagination={totalSlides > 1 ? { clickable: true } : false}
      loop={true}
      keyboard={true}
      spaceBetween={100}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
    >
      <SwiperSlide key="sticker">
        <ShelterSticker product={formatDataForSticker(product)} />
      </SwiperSlide>
      {images.map((image, index) => (
        <SwiperSlide key={index} className={styles['card-image-wrapper-item']}>
          <img src={image.url} alt={image.label || product.name['en-GB'] || 'Product image'} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
