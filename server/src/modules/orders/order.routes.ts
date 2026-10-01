import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/http/async-handler.js';
import {
  checkoutController,
  listOrdersController,
} from './order.controller.js';

export const orderRouter = Router();

orderRouter.use(requireAuth);
orderRouter.get('/', asyncHandler(listOrdersController));
orderRouter.post('/', asyncHandler(checkoutController));
