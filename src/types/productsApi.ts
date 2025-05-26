type LocalizedString = {
  [locale in 'en-GB']: string;
};

export type ProductsResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
};

export type Product = {
  id: string;
  version: number;
  name: LocalizedString;
  description: LocalizedString;
  slug: LocalizedString;
  metaTitle: LocalizedString;
  masterVariant: MasterVariant;
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
};

export type MasterVariant = {
  id: number;
  sku: string;
  key: string;
  images: Image[];
  prices: Price[];
  attributes: Attribute[];
};

export type Image = {
  url: string;
  label: string;
  dimensions: { h: number; w: number };
};

export type Price = {
  id: string;
  key: string;
  value: {
    centAmount: number;
    currencyCode: 'EUR';
    fractionDigits: number;
    type: string;
  };
};

export type Attribute = {
  name: AttributeName;
  value: AttributeValue;
};

export enum AttributeName {
  Color = 'color',
  PetType = 'pet-type',
}

export type AttributeValue = {
  key: string;
  label: string;
};
