export interface Business {
  id: string;
  name: string;
  category: Category;
  address: string;
  phone: string;
  viber?: string;       // << NEW FIELD
  description: string;
  imageUrl: string;
  googleMapLink: string;
  rating: number;
  reviews: number;
  price?: string; // price field from Google Sheet (e.g. "5000 Ks", "$10")
}

export enum Category {
  ALL = 'All',
  RESTAURANT = 'Restaurant',
  MOBILE = 'Mobile Phone',
  ELECTRONICS = 'Electronics',
  COSMETICS = 'Cosmetics',
  FASHION = 'Fashion', // Covers Women Clothes, Clothes
  BABY = 'Baby Store',
  ESSENTIALS = 'Rice & Oil', // Covers Rice, Cock Oil
  FURNITURE = 'Furniture'
}

export interface SearchResult {
  text: string;
  recommendedIds: string[];
}
