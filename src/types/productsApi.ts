export type LocalizedString = {
  [locale in 'en-GB']: string;
};

export type Response<T> = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: T[];
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
  attributes: AttributeForProduct[];
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

export type AttributeForProduct = {
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

export type ProductType = {
  id: string;
  version: number;
  versionModifiedAt: Date;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  description: string;
  classifier: string;
  attributes: AttributeForProductType[];
  key: string;
};

export type AttributeForProductType = {
  name: string;
  label: LocalizedString;
  inputTip: LocalizedString;
  isRequired: boolean;
  type: AttributeType;
  attributeConstraint: string;
  isSearchable: boolean;
  inputHint: string;
  displayGroup: string;
  level: string;
};

export type AttributeType = {
  name: string;
  values: AttributeValue[];
};
