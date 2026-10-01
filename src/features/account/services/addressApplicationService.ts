import { authTokenStore } from '../../../core/auth/authTokenStore';
import { addressService } from '../../../services/addressService';
import type { Address } from '../../../types/account';
import {
  createAddress,
  deleteAddress,
  listAddresses,
  makeDefaultAddress,
  updateAddress,
  type CreateAddressPayload,
  type RemoteAddress,
} from '../api/addressApi';

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function toAddress(address: RemoteAddress): Address {
  return {
    id: address.id,
    title: address.title,
    firstName: address.first_name,
    lastName: address.last_name,
    phone: address.phone,
    addressLine: address.address_line,
    city: address.city,
    district: address.district,
    country: address.country,
    isDefault: address.is_default,
  };
}

export async function loadAccountAddresses(): Promise<void> {
  if (!authTokenStore.get()) return;

  const addresses = await listAddresses();
  addressService.replace(addresses.map(toAddress));
}

export async function saveAccountAddress(
  input: CreateAddressPayload,
  addressId?: string,
): Promise<void> {
  if (authTokenStore.get()) {
    const result = addressId
      ? await updateAddress(addressId, input)
      : await createAddress(input);
    addressService.add(toAddress(result));
    return;
  }

  addressService.add({
    id: addressId || `address-${Date.now()}`,
    title: input.title,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    addressLine: input.addressLine,
    city: input.city,
    district: input.district,
    country: input.country,
    isDefault: input.isDefault,
  });
}

export async function removeAccountAddress(addressId: string): Promise<void> {
  if (authTokenStore.get() && uuidPattern.test(addressId)) {
    await deleteAddress(addressId);
  }

  addressService.remove(addressId);
}

export async function setAccountDefaultAddress(
  addressId: string,
): Promise<void> {
  if (authTokenStore.get() && uuidPattern.test(addressId)) {
    await makeDefaultAddress(addressId);
  }

  addressService.makeDefault(addressId);
}
