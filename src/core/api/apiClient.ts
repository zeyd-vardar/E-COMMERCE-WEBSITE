import { authTokenStore } from '../auth/authTokenStore';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api/v1';

interface ApiEnvelope<T> {
  data: T;
}

interface ApiErrorBody {
  error?: string;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = authTokenStore.get();
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');

  if (options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    throw new ApiError(response.status, body.error ?? 'İstek tamamlanamadı.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body = (await response.json()) as ApiEnvelope<T>;
  return body.data;
}
