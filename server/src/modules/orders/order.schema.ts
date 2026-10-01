import { z } from 'zod';

export const checkoutSchema = z.object({
  shippingAddressId: z.string().uuid(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
