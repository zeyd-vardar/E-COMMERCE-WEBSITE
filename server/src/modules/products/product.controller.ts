import type { Request, Response } from 'express';
import { productInputSchema } from './product.schema.js';
import { createProduct, getProduct, listProducts } from './product.service.js';

export async function listProductsController(
  request: Request,
  response: Response,
): Promise<void> {
  const page = Math.max(1, Number(request.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(request.query.limit) || 24));
  const search =
    typeof request.query.q === 'string' ? request.query.q.trim() : '';
  const category =
    typeof request.query.category === 'string' ? request.query.category : '';

  const result = await listProducts({ page, limit, search, category });
  response.json(result);
}

export async function getProductController(
  request: Request,
  response: Response,
): Promise<void> {
  const slug = Array.isArray(request.params.slug)
    ? request.params.slug[0]
    : request.params.slug;
  const product = await getProduct(slug);
  response.json({ data: product });
}

export async function createProductController(
  request: Request,
  response: Response,
): Promise<void> {
  const input = productInputSchema.parse(request.body);
  const product = await createProduct(input);
  response.status(201).json({ data: product });
}
