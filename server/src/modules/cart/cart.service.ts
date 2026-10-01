import type { CartItemInput } from './cart.schema.js';
import {
  deleteCartItem,
  findCartByUserId,
  upsertCartItem,
  type CartItemRow,
} from './cart.repository.js';

export async function getUserCart(userId: string): Promise<CartItemRow[]> {
  return findCartByUserId(userId);
}

export async function saveUserCartItem(
  userId: string,
  item: CartItemInput,
): Promise<void> {
  await upsertCartItem(userId, item);
}

export async function removeUserCartItem(
  userId: string,
  productId: string,
): Promise<void> {
  await deleteCartItem(userId, productId);
}
