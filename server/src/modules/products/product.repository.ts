import type { QueryResultRow } from 'pg';
import { executeQuery } from '../../core/database/postgres.js';
import type { ProductInput } from './product.schema.js';

export interface ProductListFilters {
  page: number;
  limit: number;
  search: string;
  category: string;
}

export interface ProductRow extends QueryResultRow {
  id: string;
  slug: string;
  total?: number;
}

export async function findProducts(
  filters: ProductListFilters,
): Promise<ProductRow[]> {
  const values: unknown[] = [];
  const conditions = ['p.is_active = true'];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(
      `(p.title_tr ILIKE $${values.length} ` +
        `OR p.title_en ILIKE $${values.length} ` +
        `OR p.sku ILIKE $${values.length})`,
    );
  }

  if (filters.category) {
    values.push(filters.category);
    conditions.push(`c.slug = $${values.length}`);
  }

  values.push(filters.limit, (filters.page - 1) * filters.limit);

  const result = await executeQuery<ProductRow>(
    `
      SELECT
        p.*,
        c.slug AS category_slug,
        COUNT(*) OVER()::int AS total
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      WHERE ${conditions.join(' AND ')}
      ORDER BY p.created_at DESC
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
    `,
    values,
  );

  return result.rows;
}

export async function findProductBySlug(
  slug: string,
): Promise<ProductRow | undefined> {
  const result = await executeQuery<ProductRow>(
    `
      SELECT p.*, c.slug AS category_slug
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      WHERE p.slug = $1 AND p.is_active = true
    `,
    [slug],
  );

  return result.rows[0];
}

export async function insertProduct(
  product: ProductInput,
): Promise<ProductRow> {
  const result = await executeQuery<ProductRow>(
    `
      INSERT INTO products (
        title_tr,
        title_en,
        slug,
        category_id,
        description_tr,
        price,
        compare_at_price,
        sku,
        images,
        colors,
        sizes,
        stock,
        is_new,
        is_best_seller,
        is_outlet
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15
      )
      RETURNING *
    `,
    [
      product.titleTr,
      product.titleEn ?? null,
      product.slug,
      product.categoryId,
      product.descriptionTr ?? null,
      product.price,
      product.compareAtPrice ?? null,
      product.sku,
      JSON.stringify(product.images),
      product.colors,
      product.sizes,
      product.stock,
      product.isNew,
      product.isBestSeller,
      product.isOutlet,
    ],
  );

  return result.rows[0];
}
