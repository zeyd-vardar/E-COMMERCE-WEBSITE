import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

const secret = () => {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error('JWT_SECRET ortam değişkeni zorunludur.');
  return value;
};

export const issueToken = (user: { id: string; email: string }) =>
  jwt.sign(user, secret(), { expiresIn: '7d' });

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Oturum açmanız gerekiyor.' });
  try {
    req.user = jwt.verify(token, secret()) as { id: string; email: string };
    next();
  } catch {
    res.status(401).json({ error: 'Geçersiz veya süresi dolmuş oturum.' });
  }
}
