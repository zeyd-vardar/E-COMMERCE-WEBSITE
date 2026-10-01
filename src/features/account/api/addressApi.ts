import { apiRequest } from '../../../core/api/apiClient';

export interface RemoteAddress {
  id: string;
  user_id: string;
  title: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_line: string;
  city: string;
  district: string;
  country: string;
  is_default: boolean;
}

export interface CreateAddressPayload {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine: string;
  city: string;
  district: string;
  country: string;
  isDefault: boolean;
}

export function listAddresses(): Promise<RemoteAddress[]> {
  return apiRequest<RemoteAddress[]>('/me/addresses');
}

export function createAddress(
  payload: CreateAddressPayload,
): Promise<RemoteAddress> {
  return apiRequest<RemoteAddress>('/me/addresses', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function deleteAddress(addressId: string): Promise<void> {
  return apiRequest<void>(`/me/addresses/${addressId}`, {
    method: 'DELETE',
  });
}

export function updateAddress(
  addressId: string,
  payload: CreateAddressPayload,
): Promise<RemoteAddress> {
  return apiRequest<RemoteAddress>(`/me/addresses/${addressId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function makeDefaultAddress(addressId: string): Promise<void> {
  return apiRequest<void>(`/me/addresses/${addressId}/default`, {
    method: 'PATCH',
  });
}
