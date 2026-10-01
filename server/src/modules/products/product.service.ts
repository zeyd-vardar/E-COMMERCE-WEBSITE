import { HttpError } from '../../shared/errors/http-error.js';
import type { ProductInput } from './product.schema.js';
import {
  findProductBySlug,
  findProducts,
  insertProduct,
  type ProductListFilters,
  type ProductRow,
} from './product.repository.js';

export interface ProductListResult {
  data: ProductRow[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export async function listProducts(
  filters: ProductListFilters,
): Promise<ProductListResult> {
  const products = await findProducts(filters);

  return {
    data: products,
    meta: {
      page: filters.page,
      limit: filters.limit,
      total: products[0]?.total ?? 0,
    },
  };
}

export async function getProduct(slug: string): Promise<ProductRow> {
  const product = await findProductBySlug(slug);

  if (!product) {
    throw new HttpError(404, 'Ürün bulunamadı.');
  }

  return product;
}

export async function createProduct(
  product: ProductInput,
): Promise<ProductRow> {
  return insertProduct(product);
}
