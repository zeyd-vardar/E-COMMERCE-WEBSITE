import { z } from 'zod';

const uuid = z.string().uuid();

export const productInputSchema = z.object({
  titleTr: z.string().min(2).max(160),
  titleEn: z.string().min(2).max(160).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  categoryId: uuid,
  descriptionTr: z.string().max(5000).optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().nullable().optional(),
  sku: z.string().min(2).max(64),
  images: z.array(z.string().url()).max(12).default([]),
  colors: z.array(z.string().max(40)).max(20).default([]),
  sizes: z.array(z.string().max(20)).max(20).default([]),
  stock: z.number().int().min(0).default(0),
  isNew: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isOutlet: z.boolean().default(false),
});

export type ProductInput = z.infer<typeof productInputSchema>;
