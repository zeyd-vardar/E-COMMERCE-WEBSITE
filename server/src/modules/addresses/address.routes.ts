import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/http/async-handler.js';
import {
  createAddressController,
  deleteAddressController,
  listAddressesController,
  makeDefaultAddressController,
  updateAddressController,
} from './address.controller.js';

export const addressRouter = Router();

addressRouter.use(requireAuth);
addressRouter.get('/', asyncHandler(listAddressesController));
addressRouter.post('/', asyncHandler(createAddressController));
addressRouter.put('/:addressId', asyncHandler(updateAddressController));
addressRouter.patch(
  '/:addressId/default',
  asyncHandler(makeDefaultAddressController),
);
addressRouter.delete('/:addressId', asyncHandler(deleteAddressController));
