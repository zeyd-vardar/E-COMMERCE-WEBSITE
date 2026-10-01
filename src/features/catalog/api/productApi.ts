import { apiRequest } from '../../../core/api/apiClient';

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface RemoteProduct {
  id: string;
  slug: string;
  title_tr: string;
  title_en?: string;
  price: string;
  stock: number;
}

export function listProducts(
  query: ProductQuery = {},
): Promise<RemoteProduct[]> {
  const parameters = new URLSearchParams();

  if (query.page) parameters.set('page', String(query.page));
  if (query.limit) parameters.set('limit', String(query.limit));
  if (query.search) parameters.set('q', query.search);
  if (query.category) parameters.set('category', query.category);

  const suffix = parameters.size ? `?${parameters}` : '';
  return apiRequest<RemoteProduct[]>(`/products${suffix}`);
}

export function getProduct(slug: string): Promise<RemoteProduct> {
  return apiRequest<RemoteProduct>(`/products/${slug}`);
}
