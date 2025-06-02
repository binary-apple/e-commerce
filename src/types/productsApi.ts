export type LocalizedString = {
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
  discounted?: Discount;
  id: string;
  key: string;
  value: PriceValue;
};

export type Discount = {
  discount: {
    id: string;
    typeId: string;
  };
  value: PriceValue;
};

export type PriceValue = {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  type: string;
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

export type CategoriesResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Category[];
};

export type Category = {
  id: string;
  version: number;
  versionModifiedAt: Date;
  lastMessageSequenceNumber: number;
  createdAt: Date;
  lastModifiedAt: Date;
  key: string;
  name: LocalizedString;
  slug: LocalizedString;
  description: LocalizedString;
  ancestors: Parent[];
  orderHint: string;
  assets: unknown[];
  parent?: Parent;
};

export type Parent = {
  typeId: 'category';
  id: string;
};
