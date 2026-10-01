import { apiRequest } from '../../../core/api/apiClient';

export interface RemoteOrder {
  id: string;
  user_id: string;
  shipping_address: Record<string, unknown>;
  total_amount: string;
  currency: string;
  status: string;
  created_at: string;
  item_count: number;
}

export function listOrders(): Promise<RemoteOrder[]> {
  return apiRequest<RemoteOrder[]>('/orders');
}

export function checkout(shippingAddressId: string): Promise<RemoteOrder> {
  return apiRequest<RemoteOrder>('/orders', {
    method: 'POST',
    body: JSON.stringify({ shippingAddressId }),
  });
}
