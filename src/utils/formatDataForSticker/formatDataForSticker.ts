import { formatPrice } from '../formatPrice/formatPrice.ts';
import type { Product } from '../../types/productsApi.ts';
import type { ProductCardConfig } from '../../types/preparedProductData.ts';

export default function formatDataForSticker(data: Product): ProductCardConfig {
  const priceObject = data.masterVariant.prices[0];
  const hasDiscount = Boolean(priceObject.discounted);

  return {
    key: data.key,
    name: data.name['en-GB'] || '',
    price: formatPrice(data.masterVariant.prices[0].value),
    image: data.masterVariant.images[0].url,
    description: data.description['en-GB'] || '',
    color:
      data.masterVariant.attributes.find((attribute) => attribute.name === 'color')?.value.key ||
      'color-cheap',
    place: '',
    //todo: replace place with country with city!
    currencyCode: data.masterVariant.prices[0].value.currencyCode,
    ...(hasDiscount && { discount: priceObject.discounted! }),
  };
}
