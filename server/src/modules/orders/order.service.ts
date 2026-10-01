import {
  createOrderFromCart,
  findOrdersByUserId,
  type OrderRow,
} from './order.repository.js';

export async function listUserOrders(userId: string): Promise<OrderRow[]> {
  return findOrdersByUserId(userId);
}

export async function checkoutUserCart(
  userId: string,
  shippingAddressId: string,
): Promise<OrderRow> {
  return createOrderFromCart(userId, shippingAddressId);
}
