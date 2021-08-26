export interface Deposito {
  quantity: Number;
  type: "in" | "out";
  product_sku: string;
  unitary_value: Number;
  cost_value: Number;
  store_slug: string;
  date: Date;
}

export interface Product {
  name: string;
  description?: string;
  brand?: string;
  sku: string;
  barcode?: string;
  value: Number;
  cost_value: Number;
  in_stock?: Number;
  category?: string;
  subcategory?: string;
  segment?: string;
  depositos: Deposito[];
}
