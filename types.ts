export interface Business {
  id: string;
  name: string;
  category: Category;
  address: string;
  phone: string;
  description: string;
  imageUrl: string;
  googleMapLink: string;
  rating: number;
  reviews: number;
  price?: string;
  detail?: string; // New field for detail image URL or text
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
