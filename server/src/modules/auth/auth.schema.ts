import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export const registerSchema = credentialsSchema.extend({
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
});

export const loginSchema = credentialsSchema;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
