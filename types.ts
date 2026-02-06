
export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Added for Flipkart-style discount display
  category: string;
  image: string;
  stock: number;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DiscountCode {
  code: string;
  percentage: number;
  description: string;
}

export interface MarketingBanner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  bgGradient: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  discountApplied?: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Processing';
  trackingNumber?: string;
  date: string;
}

export type View = 'store' | 'admin';
