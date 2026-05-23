export interface ApiResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface Cart {
  id: number;
  total: number;
  discountedTotal: number;
  totalQuantity: number;
  totalProducts: number;
  userId: number;
  products: Product[];
}

export interface Product {
  discountPercentage: number;
  id: number;
  title: string;
  quantity: number;
  price: number;
  total: number;
}
