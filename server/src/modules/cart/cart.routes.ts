import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/http/async-handler.js';
import {
  deleteCartItemController,
  getCartController,
  saveCartItemController,
} from './cart.controller.js';

export const cartRouter = Router();

cartRouter.use(requireAuth);
cartRouter.get('/', asyncHandler(getCartController));
cartRouter.put('/items', asyncHandler(saveCartItemController));
cartRouter.delete('/items/:productId', asyncHandler(deleteCartItemController));
