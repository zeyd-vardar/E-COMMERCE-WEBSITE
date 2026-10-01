import { apiRequest } from '../../../core/api/apiClient';
import { authTokenStore } from '../../../core/auth/authTokenStore';

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthResult {
  user: AuthUser;
  token: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<AuthResult> {
  const result = await apiRequest<AuthResult>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  authTokenStore.set(result.token);
  return result;
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  const result = await apiRequest<AuthResult>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  authTokenStore.set(result.token);
  return result;
}

export function logout(): Promise<void> {
  authTokenStore.clear();
  return Promise.resolve();
}
