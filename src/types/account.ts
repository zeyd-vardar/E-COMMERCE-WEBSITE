export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate?: string;
}
export interface Address {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine: string;
  city: string;
  district: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}
export type OrderStatus =
  'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  itemCount: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
}
export interface AccountMessage {
  id: string;
  subject: { tr: string; en: string };
  preview: { tr: string; en: string };
  createdAt: string;
  isRead: boolean;
  type: 'support' | 'order' | 'return' | 'system';
}
export interface StockWatch {
  productId: string;
  createdAt: string;
  desiredColor?: string;
  desiredSize?: string;
}
