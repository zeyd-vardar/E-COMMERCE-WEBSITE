import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';
import { cartItemSchema, cartProductIdSchema } from './cart.schema.js';
import {
  getUserCart,
  removeUserCartItem,
  saveUserCartItem,
} from './cart.service.js';

export async function getCartController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const cart = await getUserCart(userId);
  response.json({ data: cart });
}

export async function saveCartItemController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const item = cartItemSchema.parse(request.body);
  await saveUserCartItem(userId, item);
  response.status(204).send();
}

export async function deleteCartItemController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const productId = cartProductIdSchema.parse(request.params.productId);
  await removeUserCartItem(userId, productId);
  response.status(204).send();
}
