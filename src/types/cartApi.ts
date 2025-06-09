import type { LocalizedString, MasterVariant, PriceValue } from './productsApi';

export type Cart = {
  id: string;
  version: number;
  createdAt: Date;
  lastModifiedAt: Date;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  lineItems: CartLineItem[];
  customLineItems: CartCustomLineItem[];
  totalPrice: PriceValue;
  taxedPrice?: TaxedPrice;
  shippingAddress?: Address;
  billingAddress?: Address;
  country: string;
  currency: string;
  discountCodes?: DiscountCode[];
  paymentInfo?: PaymentInfo;
  customFields?: CustomFields;
};

export type CartLineItem = {
  id: string;
  productId: string;
  name: LocalizedString;
  productType: Reference;
  variant: MasterVariant;
  price: PriceValue;
  quantity: number;
  totalPrice: PriceValue;
  discountedPricePerQuantity?: DiscountedLineItemPrice[];
  customFields?: CustomFields;
};

export type CartCustomLineItem = {
  id: string;
  name: LocalizedString;
  PriceValue: PriceValue;
  quantity: number;
  totalPrice: PriceValue;
  slug?: LocalizedString;
  customFields?: CustomFields;
};

export type DiscountedLineItemPrice = {
  value: PriceValue;
  discount: Reference;
};

export type TaxedPrice = {
  totalNet: PriceValue;
  totalGross: PriceValue;
  taxPortions: TaxPortion[];
};

export type TaxPortion = {
  name: string;
  rate: number;
  amount: PriceValue;
};

export type Address = {
  id?: string;
  key?: string;
  country: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  region?: string;
};

export type DiscountCode = {
  code: string;
  discount: Reference;
};

export type Reference = {
  id: string;
  typeId: string;
};

export type PaymentInfo = {
  payments: Reference[];
};

export type CustomFields = {
  type: Reference;
  fields: { [key: string]: string };
};

export type CartDraft = {
  currency: string;
  customerEmail?: string;
  businessUnit?: Reference;
  store?: Reference;
  lineItems?: LineItemDraft[];
  taxMode?: string;
  inventoryMode?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  shippingMethod?: Reference;
  itemShippingAddresses?: Address[];
  shippingMode?: string;
  discountCodes?: string[];
  country?: string;
  locale?: string;
  deleteDaysAfterLastModification?: number;
  custom?: CustomFields;
};

export type LineItemDraft = {
  key?: string;
  productId?: string;
  variantId?: number;
  sku?: string;
  quantity?: number;
  addedAt?: string;
  distributionChannel?: Reference;
  shippingDetails?: ItemShippingTarget[];
  custom?: CustomFields;
};

export type ItemShippingTarget = {
  addressKey: string;
  quantity: number;
  shippingMethodKey?: string;
};
