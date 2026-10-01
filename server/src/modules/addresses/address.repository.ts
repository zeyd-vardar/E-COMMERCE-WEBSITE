import type { QueryResultRow } from 'pg';
import {
  executeQuery,
  executeTransaction,
} from '../../core/database/postgres.js';
import type { AddressInput } from './address.schema.js';

export interface AddressRow extends QueryResultRow {
  id: string;
  user_id: string;
}

export async function findAddressesByUserId(
  userId: string,
): Promise<AddressRow[]> {
  const result = await executeQuery<AddressRow>(
    `
      SELECT *
      FROM addresses
      WHERE user_id = $1
      ORDER BY is_default DESC, created_at DESC
    `,
    [userId],
  );

  return result.rows;
}

export async function insertAddress(
  userId: string,
  address: AddressInput,
): Promise<AddressRow> {
  return executeTransaction(async (client) => {
    if (address.isDefault) {
      await client.query(
        `
          UPDATE addresses
          SET is_default = false
          WHERE user_id = $1
        `,
        [userId],
      );
    }

    const result = await client.query<AddressRow>(
      `
        INSERT INTO addresses (
          user_id,
          title,
          first_name,
          last_name,
          phone,
          address_line,
          city,
          district,
          country,
          is_default
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `,
      [
        userId,
        address.title,
        address.firstName,
        address.lastName,
        address.phone,
        address.addressLine,
        address.city,
        address.district,
        address.country,
        address.isDefault,
      ],
    );

    return result.rows[0];
  });
}

export async function deleteAddress(
  userId: string,
  addressId: string,
): Promise<boolean> {
  const result = await executeQuery(
    `
      DELETE FROM addresses
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `,
    [addressId, userId],
  );

  return Boolean(result.rowCount);
}

export async function updateAddress(
  userId: string,
  addressId: string,
  address: AddressInput,
): Promise<AddressRow | undefined> {
  const result = await executeQuery<AddressRow>(
    `
      UPDATE addresses
      SET
        title = $3,
        first_name = $4,
        last_name = $5,
        phone = $6,
        address_line = $7,
        city = $8,
        district = $9,
        country = $10
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `,
    [
      addressId,
      userId,
      address.title,
      address.firstName,
      address.lastName,
      address.phone,
      address.addressLine,
      address.city,
      address.district,
      address.country,
    ],
  );

  return result.rows[0];
}

export async function setDefaultAddress(
  userId: string,
  addressId: string,
): Promise<boolean> {
  return executeTransaction(async (client) => {
    const address = await client.query(
      `
        SELECT id
        FROM addresses
        WHERE id = $1 AND user_id = $2
        FOR UPDATE
      `,
      [addressId, userId],
    );

    if (!address.rowCount) return false;

    await client.query(
      `
        UPDATE addresses
        SET is_default = (id = $2)
        WHERE user_id = $1
      `,
      [userId, addressId],
    );

    return true;
  });
}
