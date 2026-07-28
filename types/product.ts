export interface Product {
  id: string;
  title: string;
  material: string;
  price: string;
  numericPrice: number;
  spec: string;
  description: string;
  fabricDetails: string;
  image: string;
  fabricImage: string;
  garmentImage: string;
  campaignImage: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  size: string;
  quantity: number;
}
