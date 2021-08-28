export interface Product {
  product_id?: number;
  product_sku?: string;
  total_value?: number;
  total_discount?: number;
  total_gross_profit?: number;
  unitary_value?: number;
  unitary_cost_value?: number;
  unitary_gross_profit?: number;
  quantity?: number;
}

export interface Order {
  id?: number;
  reference?: string;
  total_value?: number;
  total_discount?: number;
  returned?: number;
  store_slug?: string;
  payment_method?: string;
  situacao: string;
  products: Product[];
}
