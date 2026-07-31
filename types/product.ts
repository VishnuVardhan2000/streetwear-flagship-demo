export interface Product {
  id: string;
  title: string;
  material: string;
  price: string;
  numericPrice: number;
  spec: string;
  description: string;
  fabricDetails: string;
  image: string; // VIEW 01: HERO PRODUCT
  garmentImage: string; // VIEW 02: CONSTRUCTION DETAIL
  fabricImage: string; // VIEW 03: FABRIC MACRO
  campaignImage: string; // VIEW 04: EDITORIAL MODEL
  alternateColorImage: string; // VIEW 05: ALTERNATE COLOUR
  alternateColorName: string; // Secondary Colorway Name
  lifestyleImage: string; // VIEW 06: LIFESTYLE EDITORIAL
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
