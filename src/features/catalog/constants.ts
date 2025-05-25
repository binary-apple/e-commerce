import type { ProductConfig } from '../../types/product.ts';
//Todo: replace static config with request to server && past here config for Catalog page labels
export const products: ProductConfig[] = [
  {
    name: 'Tierheim Berlin',
    price: 75,
    image: 'https://binary-apple.github.io/furever-images/img-webp/rabbit-1.webp',
    description:
      'Europe’s largest animal shelter caring for around 1,300 animals daily including dogs, cats, rabbits and birds.',
    place: 'Berlin, Germany',
    color: 'color-average',
  },
  {
    name: 'Battersea Dogs & Cats Home',
    price: 50,
    image: 'https://binary-apple.github.io/furever-images/img-webp/cat-6.webp',
    description:
      'Historic animal shelter in London, caring for lost and abandoned dogs and cats, and rehoming thousands of pets.',
    place: 'Berlin, Germany',
    color: 'color-expensive',
  },
  {
    name: 'CottonTails Rabbit & Guinea Pig Rescue',
    price: 25,
    image: 'https://binary-apple.github.io/furever-images/img-webp/cat-2.webp',
    description:
      'UK charity dedicated to rescuing and rehoming rabbits and guinea pigs, providing care and resources for these small pets.',
    place: 'Berlin, Germany',
    color: 'color-cheap',
  },
  {
    name: 'A Cupulatta (La Cité des Tortues)',
    price: 100,
    image: 'https://binary-apple.github.io/furever-images/img-webp/cat-5.webp',
    description:
      'Tortoise sanctuary in Corsica covering 2.5 hectares and housing over 3,000 animals of 170 species.',
    place: 'Berlin, Germany',
    color: 'color-average',
  },
  {
    name: 'Battersea Dogs & Cats Home',
    price: 15,
    image: 'https://binary-apple.github.io/furever-images/img-webp/dog-1.webp',
    description:
      'Historic animal shelter in London, caring for lost and abandoned dogs and cats, and rehoming thousands of pets.',
    place: 'Berlin, Germany',
    color: 'color-cheap',
  },
  {
    name: 'CottonTails Rabbit & Guinea Pig Rescue',
    price: 25,
    image: 'https://binary-apple.github.io/furever-images/img-webp/dog-4.webp',
    description:
      'UK charity dedicated to rescuing and rehoming rabbits and guinea pigs, providing care and resources for these small pets.',
    place: 'Berlin, Germany',
    color: 'color-cheap',
  },
];
