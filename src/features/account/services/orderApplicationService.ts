import { authTokenStore } from '../../../core/auth/authTokenStore';
import { orders } from '../../../data/account';
import type { Order, OrderStatus } from '../../../types/account';
import { listOrders } from '../api/orderApi';

const knownStatuses = new Set<OrderStatus>([
  'pending',
  'confirmed',
  'preparing',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
]);

export async function loadAccountOrders(): Promise<void> {
  if (!authTokenStore.get()) return;

  const remoteOrders = await listOrders();
  const mappedOrders: Order[] = remoteOrders.map((order) => ({
    id: order.id,
    orderNumber: order.id.slice(0, 8).toUpperCase(),
    date: order.created_at.slice(0, 10),
    itemCount: order.item_count,
    total: Number(order.total_amount),
    status: knownStatuses.has(order.status as OrderStatus)
      ? (order.status as OrderStatus)
      : 'pending',
  }));

  orders.splice(0, orders.length, ...mappedOrders);
}
