import { Business, Category } from './types';

export const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Khit Thit Mobile',
    category: Category.MOBILE,
    address: 'Bogyoke Road, Taungoo',
    phone: '09-111222333',
    description: 'Latest iPhones, Samsung, and accessories. Screen replacement service available.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff70?w=500&q=80',
    googleMapLink: '#',
    rating: 4.8,
    reviews: 120,
    price: 'Starting at 200,000 Ks',
    detail: 'https://images.unsplash.com/photo-1556656793-02715d8dd660?w=600&q=80' // Mock detail (Promotion flyer)
  },
  {
    id: '2',
    name: 'Lady Beauty Cosmetics',
    category: Category.COSMETICS,
    address: 'Market St, Taungoo',
    phone: '09-998877665',
    description: 'Authentic branded cosmetics, skincare, and perfumes.',
    imageUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&q=80',
    googleMapLink: '#',
    rating: 4.9,
    reviews: 85,
    price: '5,000 - 50,000 Ks',
    detail: 'https://images.unsplash.com/photo-1522335789203-abd6538d8ad8?w=600&q=80'
  },
  {
    id: '3',
    name: 'Shwe Mi Family Rice Shop',
    category: Category.ESSENTIALS,
    address: 'Station Road, Taungoo',
    phone: '09-333444555',
    description: 'High quality Paw San Hmwe, Manaw Thukha and peanut oil wholesale.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
    googleMapLink: '#',
    rating: 4.7,
    reviews: 45,
    price: 'Whole Sale Price'
  },
  {
    id: '4',
    name: 'Baby World',
    category: Category.BABY,
    address: 'Tabin Shwe Htee Road, Taungoo',
    phone: '09-555666777',
    description: 'Everything for your baby - diapers, milk powder, toys, and clothes.',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-25f4682ae2ed?w=500&q=80',
    googleMapLink: '#',
    rating: 4.6,
    reviews: 60,
    price: 'Discount 10%'
  },
  {
    id: '5',
    name: 'Modern Home Furniture',
    category: Category.FURNITURE,
    address: 'Yangon-Mandalay Hwy, Taungoo',
    phone: '09-222333444',
    description: 'Teak wood beds, sofas, and office furniture.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
    googleMapLink: '#',
    rating: 4.5,
    reviews: 30,
    detail: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80'
  },
  {
    id: '6',
    name: 'Fashion Queen',
    category: Category.FASHION,
    address: 'Downtown, Taungoo',
    phone: '09-444555666',
    description: 'Trendy women clothes, dresses, and traditional wear.',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
    googleMapLink: '#',
    rating: 4.8,
    reviews: 150,
    price: 'New Arrival'
  },
  {
    id: '7',
    name: 'Power Electronics',
    category: Category.ELECTRONICS,
    address: 'Electronic Row, Taungoo',
    phone: '09-777888999',
    description: 'Air conditioners, Refrigerators, Washing machines and electrical parts.',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&q=80',
    googleMapLink: '#',
    rating: 4.3,
    reviews: 40
  },
  {
    id: '8',
    name: 'Yummy Spicy Noodle',
    category: Category.RESTAURANT,
    address: 'Night Market, Taungoo',
    phone: '09-123123123',
    description: 'Best Mala Xianguo and spicy noodles in town.',
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80',
    googleMapLink: '#',
    rating: 4.7,
    reviews: 200,
    price: '3000 Ks per bowl'
  }
];
