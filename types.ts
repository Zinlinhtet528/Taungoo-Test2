export interface Business {
  id: string;
  name: string;
  category: Category;
  address: string;
  phone: string;
  viber?: string;
  description: string;
  imageUrl: string;
  googleMapLink: string;
  rating: number;
  reviews: number;
  price?: string;
  detail?: string;
}

export enum Category {
  ALL = 'All',
  RESTAURANT = 'Restaurant',
  MOBILE = 'Mobile Phone',
  ELECTRONICS = 'Electronics',
  COSMETICS = 'Cosmetics',
  FASHION = 'Fashion',
  BABY = 'Baby Store',
  ESSENTIALS = 'Rice & Oil',
  FURNITURE = 'Furniture'
}

export interface SearchResult {
  text: string;
  recommendedIds: string[];
}
