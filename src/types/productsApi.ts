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
  key: string;
  masterData: MasterData;
};

export type MasterData = {
  staged: {
    name: LocalizedString;
    description: LocalizedString;
    slug: LocalizedString;
    masterVariant: MasterVariant;
  };
};

export type MasterVariant = {
  images: Image[];
  prices: Price[];
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
