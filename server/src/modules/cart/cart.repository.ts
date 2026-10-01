import type { QueryResultRow } from 'pg';
import { executeQuery } from '../../core/database/postgres.js';
import type { CartItemInput } from './cart.schema.js';

export interface CartItemRow extends QueryResultRow {
  id: string;
  quantity: number;
  product_id: string;
}

interface CartRow extends QueryResultRow {
  id: string;
}

export async function findCartByUserId(userId: string): Promise<CartItemRow[]> {
  const result = await executeQuery<CartItemRow>(
    `
      SELECT
        ci.id,
        ci.quantity,
        p.id AS product_id,
        p.slug,
        p.title_tr,
        p.price,
        p.stock,
        p.images
      FROM cart_items AS ci
      JOIN carts AS c ON c.id = ci.cart_id
      JOIN products AS p ON p.id = ci.product_id
      WHERE c.user_id = $1
    `,
    [userId],
  );

  return result.rows;
}

export async function upsertCartItem(
  userId: string,
  item: CartItemInput,
): Promise<void> {
  const cartResult = await executeQuery<CartRow>(
    `
      INSERT INTO carts (user_id)
      VALUES ($1)
      ON CONFLICT (user_id)
      DO UPDATE SET updated_at = now()
      RETURNING id
    `,
    [userId],
  );

  await executeQuery(
    `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (cart_id, product_id)
      DO UPDATE SET
        quantity = EXCLUDED.quantity,
        updated_at = now()
    `,
    [cartResult.rows[0].id, item.productId, item.quantity],
  );
}

export async function deleteCartItem(
  userId: string,
  productId: string,
): Promise<void> {
  await executeQuery(
    `
      DELETE FROM cart_items
      USING carts
      WHERE cart_items.cart_id = carts.id
        AND carts.user_id = $1
        AND cart_items.product_id = $2
    `,
    [userId, productId],
  );
}
