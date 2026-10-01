import cors from 'cors';
import express, { type Express } from 'express';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { addressRouter } from './modules/addresses/address.routes.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { cartRouter } from './modules/cart/cart.routes.js';
import { healthRouter } from './modules/health/health.routes.js';
import { orderRouter } from './modules/orders/order.routes.js';
import { productRouter } from './modules/products/product.routes.js';

export function createApp(): Express {
  const app = express();
  const clientOrigins = (
    process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'
  ).split(',');

  app.use(cors({ origin: clientOrigins, credentials: true }));
  app.use(express.json({ limit: '100kb' }));

  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1/products', productRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/me/addresses', addressRouter);
  app.use('/api/v1/cart', cartRouter);
  app.use('/api/v1/orders', orderRouter);

  app.use(errorMiddleware);

  return app;
}
