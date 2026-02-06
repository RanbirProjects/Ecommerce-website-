
import { Product, Order, DiscountCode, MarketingBanner } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Horizon Smart Watch V2',
    description: 'A premium smartwatch with heart rate monitoring, GPS tracking, and a sleek titanium finish.',
    price: 199.99,
    originalPrice: 349.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&h=600&auto=format&fit=crop',
    stock: 25
  },
  {
    id: '2',
    name: 'Nebula Pro Headphones',
    description: 'Experience pure sound with industry-leading noise cancellation and 40-hour battery life.',
    price: 249.00,
    originalPrice: 399.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&h=600&auto=format&fit=crop',
    stock: 12
  },
  {
    id: '3',
    name: 'Artisan Leather Weekender',
    description: 'Hand-crafted top-grain leather bag perfect for short trips and professional travel.',
    price: 129.50,
    originalPrice: 189.50,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&h=600&auto=format&fit=crop',
    stock: 8
  },
  {
    id: '4',
    name: 'Lumina Desk Lamp',
    description: 'Minimalist LED desk lamp with adjustable color temperature and wireless charging base.',
    price: 49.99,
    originalPrice: 79.99,
    category: 'Home Office',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=600&h=600&auto=format&fit=crop',
    stock: 40
  },
  {
    id: '5',
    name: 'Zenith 4K Pro Camera',
    description: 'Capture world-class imagery with full-frame sensor technology and legendary optical precision.',
    price: 1999.00,
    originalPrice: 2499.00,
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=600&auto=format&fit=crop',
    stock: 5
  },
  {
    id: '6',
    name: 'Onyx Mechanical Keyboard',
    description: 'Tactile perfection meets aesthetic brilliance. Custom switches and aerospace-grade aluminum.',
    price: 159.00,
    originalPrice: 210.00,
    category: 'Home Office',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&h=600&auto=format&fit=crop',
    stock: 15
  },
  {
    id: '7',
    name: 'Elysian Smart Espresso',
    description: 'App-controlled brewing system that delivers barista-quality coffee with a single touch.',
    price: 699.00,
    originalPrice: 850.00,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&h=600&auto=format&fit=crop',
    stock: 10
  }
];

export const DISCOUNT_CODES: DiscountCode[] = [
  { code: 'LUMINA10', percentage: 10, description: '10% New Customer Discount' },
  { code: 'ADOBE20', percentage: 20, description: 'Enterprise Partner Discount' },
  { code: 'SUMMER25', percentage: 25, description: 'Flash Summer Sale' }
];

export const MARKETING_BANNERS: MarketingBanner[] = [
  {
    id: 'b1',
    title: 'The Grand Electronics Sale',
    subtitle: 'Up to 60% Off on Premium Tech & Accessories.',
    cta: 'Shop Now',
    bgGradient: 'from-blue-700 to-indigo-900'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-5501',
    customerName: 'Alex Johnson',
    customerEmail: 'alex@example.com',
    items: [{ ...INITIAL_PRODUCTS[0], quantity: 1, originalPrice: 349.00 }],
    total: 299.99,
    status: 'Delivered',
    trackingNumber: 'LX-8822001',
    date: '2024-05-15'
  }
];

export const SALES_DATA = [
  { name: 'Jan', sales: 42000 },
  { name: 'Feb', sales: 38000 },
  { name: 'Mar', sales: 56000 },
  { name: 'Apr', sales: 49000 },
  { name: 'May', sales: 72000 },
  { name: 'Jun', sales: 89000 },
];
