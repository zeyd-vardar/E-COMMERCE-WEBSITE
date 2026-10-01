import type { Request, Response } from 'express';
import { loginSchema, registerSchema } from './auth.schema.js';
import { loginUser, registerUser } from './auth.service.js';

export async function registerController(
  request: Request,
  response: Response,
): Promise<void> {
  const input = registerSchema.parse(request.body);
  const result = await registerUser(input);
  response.status(201).json({ data: result });
}

export async function loginController(
  request: Request,
  response: Response,
): Promise<void> {
  const input = loginSchema.parse(request.body);
  const result = await loginUser(input);
  response.json({ data: result });
}
