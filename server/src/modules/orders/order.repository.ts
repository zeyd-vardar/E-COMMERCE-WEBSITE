import type { QueryResultRow } from 'pg';
import {
  executeQuery,
  executeTransaction,
} from '../../core/database/postgres.js';

interface OrderItemRow extends QueryResultRow {
  product_id: string;
  title_tr: string;
  sku: string;
  price: string;
  stock: number;
  quantity: number;
}

export interface OrderRow extends QueryResultRow {
  id: string;
  user_id: string;
  total_amount: string;
  status: string;
  created_at: Date;
  item_count?: number;
}

export async function findOrdersByUserId(userId: string): Promise<OrderRow[]> {
  const result = await executeQuery<OrderRow>(
    `
      SELECT
        o.*,
        COUNT(oi.id)::int AS item_count
      FROM orders AS o
      LEFT JOIN order_items AS oi ON oi.order_id = o.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `,
    [userId],
  );

  return result.rows;
}

export async function createOrderFromCart(
  userId: string,
  shippingAddressId: string,
): Promise<OrderRow> {
  return executeTransaction(async (client) => {
    const addressResult = await client.query(
      `
        SELECT *
        FROM addresses
        WHERE id = $1 AND user_id = $2
      `,
      [shippingAddressId, userId],
    );

    if (!addressResult.rowCount) {
      throw new Error('Teslimat adresi bulunamadı.');
    }

    const itemResult = await client.query<OrderItemRow>(
      `
        SELECT
          p.id AS product_id,
          p.title_tr,
          p.sku,
          p.price,
          p.stock,
          ci.quantity
        FROM carts AS c
        JOIN cart_items AS ci ON ci.cart_id = c.id
        JOIN products AS p ON p.id = ci.product_id
        WHERE c.user_id = $1
        FOR UPDATE OF p
      `,
      [userId],
    );

    if (!itemResult.rowCount) {
      throw new Error('Sepetiniz boş.');
    }

    for (const item of itemResult.rows) {
      if (item.stock < item.quantity) {
        throw new Error(`${item.title_tr} için yeterli stok yok.`);
      }
    }

    const total = itemResult.rows.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );

    const orderResult = await client.query<OrderRow>(
      `
        INSERT INTO orders (
          user_id,
          shipping_address,
          total_amount,
          status
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [userId, addressResult.rows[0], total, 'pending'],
    );

    for (const item of itemResult.rows) {
      await client.query(
        `
          INSERT INTO order_items (
            order_id,
            product_id,
            title,
            sku,
            unit_price,
            quantity
          )
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          orderResult.rows[0].id,
          item.product_id,
          item.title_tr,
          item.sku,
          item.price,
          item.quantity,
        ],
      );

      await client.query(
        `
          UPDATE products
          SET stock = stock - $1
          WHERE id = $2
        `,
        [item.quantity, item.product_id],
      );
    }

    await client.query(
      `
        DELETE FROM cart_items
        USING carts
        WHERE cart_items.cart_id = carts.id
          AND carts.user_id = $1
      `,
      [userId],
    );

    return orderResult.rows[0];
  });
}
