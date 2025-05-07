// Product related types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discount?: number;
  stock: number;
}

// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

// Cart related types
export interface CartItem {
  id      : number;
  title   : string;
  price   : number;
  quantity: number;
  image   : string;
}

// Order related types
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
} 