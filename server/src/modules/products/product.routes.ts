import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/http/async-handler.js';
import {
  createProductController,
  getProductController,
  listProductsController,
} from './product.controller.js';

export const productRouter = Router();

productRouter.get('/', asyncHandler(listProductsController));
productRouter.get('/:slug', asyncHandler(getProductController));
productRouter.post('/', requireAuth, asyncHandler(createProductController));
