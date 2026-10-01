import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(20),
});

export const cartProductIdSchema = z.string().uuid();

export type CartItemInput = z.infer<typeof cartItemSchema>;
