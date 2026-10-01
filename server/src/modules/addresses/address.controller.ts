import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';
import { addressIdSchema, addressInputSchema } from './address.schema.js';
import {
  createUserAddress,
  listUserAddresses,
  makeUserAddressDefault,
  removeUserAddress,
  updateUserAddress,
} from './address.service.js';

export async function listAddressesController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const addresses = await listUserAddresses(userId);
  response.json({ data: addresses });
}

export async function createAddressController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const input = addressInputSchema.parse(request.body);
  const address = await createUserAddress(userId, input);
  response.status(201).json({ data: address });
}

export async function deleteAddressController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const addressId = addressIdSchema.parse(request.params.addressId);
  await removeUserAddress(userId, addressId);
  response.status(204).send();
}

export async function updateAddressController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const addressId = addressIdSchema.parse(request.params.addressId);
  const input = addressInputSchema.parse(request.body);
  const address = await updateUserAddress(userId, addressId, input);
  response.json({ data: address });
}

export async function makeDefaultAddressController(
  request: Request,
  response: Response,
): Promise<void> {
  const userId = (request as AuthenticatedRequest).user!.id;
  const addressId = addressIdSchema.parse(request.params.addressId);
  await makeUserAddressDefault(userId, addressId);
  response.status(204).send();
}
