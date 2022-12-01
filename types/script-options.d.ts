interface ApolloPayCredentials {
  merchant_key: string;
  api_key: string;
}

interface ApolloPayOptions {
  title: string;
  enabled: boolean;
  validate: boolean;
  checkout_url: string;
  validate_url: string;
}

interface ApolloPayProductAttributes {
  product_name: string;
  product_price: number;
  product_sku: string;
  quantity: number;
  total: number;
  tax: number;
}

interface ApolloPayOrderAttributes {
  ap_type: string;
  ap_callback_url: string;
  ap_order_sub_total: number;
  ap_order_total: number;
  ap_timestamp: string;
  ap_order_id: number;
  ap_mct: string;
  ap_order_email: string;
  ap_currency: string;
  ap_currency_symbol: string;
  ap_shipping_total: number;
  ap_tax_total: number;
  ap_products?: ApolloPayProductAttributes[];
}

export {
  ApolloPayCredentials,
  ApolloPayOptions,
  ApolloPayOrderAttributes,
  ApolloPayProductAttributes,
};
