
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

export interface CartItem {
  businessId: string;
  businessName: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

export interface OrderInfo {
  name: string;
  phone: string;
  address: string;
}

export enum Category {
  ALL = 'All',
  BEANS = 'ပဲအမျိုးမျိုး',
  FRUITS = 'သစ်သီး',
  GROCERIES = 'ကုန်စိမ်း',
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
