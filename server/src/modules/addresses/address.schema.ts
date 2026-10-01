import { z } from 'zod';

export const addressInputSchema = z.object({
  title: z.string().min(2).max(50),
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  phone: z.string().min(7).max(30),
  addressLine: z.string().min(5).max(500),
  city: z.string().min(2).max(80),
  district: z.string().min(2).max(80),
  country: z.string().min(2).max(80).default('Türkiye'),
  isDefault: z.boolean().default(false),
});

export const addressIdSchema = z.string().uuid();

export type AddressInput = z.infer<typeof addressInputSchema>;
