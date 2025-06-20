export type PromoCode = {
  id: string;
  code: string;
  key: string;
  name: {
    [key: string]: string;
  };
  description?: {
    [key: string]: string;
  };
  isActive: boolean;
  cartDiscounts: Array<{
    id: string;
    value: {
      type: string;
      money?: {
        centAmount: number;
        currencyCode: string;
      };
      permyriad?: number;
    };
  }>;
};

export type PromoCodesResponse = {
  results: PromoCode[];
  count: number;
  total: number;
  offset: number;
  limit: number;
};
