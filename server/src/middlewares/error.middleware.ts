import type { ErrorRequestHandler } from 'express';
import { z } from 'zod';
import { HttpError } from '../shared/errors/http-error.js';

export const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
): void => {
  if (error instanceof z.ZodError) {
    response.status(422).json({
      error: 'Gönderilen veri geçersiz.',
      details: error.issues,
    });
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ error: error.message });
    return;
  }

  const message = error instanceof Error ? error.message : 'Sunucu hatası.';

  if (message.includes('unique')) {
    response.status(409).json({ error: 'Bu kayıt zaten mevcut.' });
    return;
  }

  console.error(error);
  response.status(500).json({ error: message });
};
