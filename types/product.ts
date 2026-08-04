export interface GalleryView {
  url: string;
  label: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  material: string;
  price: string;
  numericPrice: number;
  spec: string;
  description: string;
  fabricDetails: string;
  image: string; // Core Hero Image
  galleryImages: GalleryView[]; // Real unique non-duplicated gallery slides
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
