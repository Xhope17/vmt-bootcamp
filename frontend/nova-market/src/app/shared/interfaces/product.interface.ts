export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface Product {
  id: number;
  thumbnail: string;
  sku: string;
  title: string;
  description: string;
  rating: number;
  stock: number;
  images: string[];
  brand: string;
  category: string;
  discountPercentage: number;
  price: number;
}
