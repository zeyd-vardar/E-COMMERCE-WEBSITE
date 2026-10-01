import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';
import { checkoutSchema } from './order.schema.js';
import { checkoutUserCart, listUserOrders } from './order.service.js';

export async function listOrdersController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const orders = await listUserOrders(userId);
  response.json({ data: orders });
}

export async function checkoutController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const { shippingAddressId } = checkoutSchema.parse(request.body);
  const order = await checkoutUserCart(userId, shippingAddressId);
  response.status(201).json({ data: order });
}
