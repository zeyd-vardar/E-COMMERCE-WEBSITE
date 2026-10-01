import { HttpError } from '../../shared/errors/http-error.js';
import type { AddressInput } from './address.schema.js';
import {
  deleteAddress,
  findAddressesByUserId,
  insertAddress,
  setDefaultAddress,
  type AddressRow,
  updateAddress,
} from './address.repository.js';

export async function listUserAddresses(userId: string): Promise<AddressRow[]> {
  return findAddressesByUserId(userId);
}

export async function createUserAddress(
  userId: string,
  input: AddressInput,
): Promise<AddressRow> {
  return insertAddress(userId, input);
}

export async function removeUserAddress(
  userId: string,
  addressId: string,
): Promise<void> {
  const deleted = await deleteAddress(userId, addressId);

  if (!deleted) {
    throw new HttpError(404, 'Adres bulunamadı.');
  }
}

export async function updateUserAddress(
  userId: string,
  addressId: string,
  input: AddressInput,
): Promise<AddressRow> {
  const address = await updateAddress(userId, addressId, input);

  if (!address) {
    throw new HttpError(404, 'Adres bulunamadı.');
  }

  return address;
}

export async function makeUserAddressDefault(
  userId: string,
  addressId: string,
): Promise<void> {
  const updated = await setDefaultAddress(userId, addressId);

  if (!updated) {
    throw new HttpError(404, 'Adres bulunamadı.');
  }
}
