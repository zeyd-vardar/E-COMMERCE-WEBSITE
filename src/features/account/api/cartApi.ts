import { apiRequest } from '../../../core/api/apiClient';

export interface RemoteCartItem {
  id: string;
  product_id: string;
  quantity: number;
  slug: string;
  title_tr: string;
  price: string;
  stock: number;
  images: string[];
}

export function getCart(): Promise<RemoteCartItem[]> {
  return apiRequest<RemoteCartItem[]>('/cart');
}

export function saveCartItem(
  productId: string,
  quantity: number,
): Promise<void> {
  return apiRequest<void>('/cart/items', {
    method: 'PUT',
    body: JSON.stringify({ productId, quantity }),
  });
}

export function deleteCartItem(productId: string): Promise<void> {
  return apiRequest<void>(`/cart/items/${productId}`, {
    method: 'DELETE',
  });
}
