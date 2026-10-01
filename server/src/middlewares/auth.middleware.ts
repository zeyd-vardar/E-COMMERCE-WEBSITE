import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

function jwtSecret(): string {
  const value = process.env.JWT_SECRET;

  if (!value) {
    throw new Error('JWT_SECRET ortam değişkeni zorunludur.');
  }

  return value;
}

export function createAccessToken(user: { id: string; email: string }): string {
  return jwt.sign(user, jwtSecret(), { expiresIn: '7d' });
}

export function requireAuth(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): void {
  const token = request.header('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token) {
    response.status(401).json({ error: 'Oturum açmanız gerekiyor.' });
    return;
  }

  try {
    request.user = jwt.verify(token, jwtSecret()) as {
      id: string;
      email: string;
    };
    next();
  } catch {
    response.status(401).json({ error: 'Geçersiz veya süresi dolmuş oturum.' });
  }
}
