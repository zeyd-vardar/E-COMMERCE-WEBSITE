import type { QueryResultRow } from 'pg';
import { executeQuery } from '../../core/database/postgres.js';

export interface UserRow extends QueryResultRow {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
}

export async function insertUser(input: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}): Promise<UserRow> {
  const result = await executeQuery<UserRow>(
    `
      INSERT INTO users (
        email,
        password_hash,
        first_name,
        last_name
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, password_hash, first_name, last_name
    `,
    [input.email, input.passwordHash, input.firstName, input.lastName],
  );

  return result.rows[0];
}

export async function findUserByEmail(
  email: string,
): Promise<UserRow | undefined> {
  const result = await executeQuery<UserRow>(
    `
      SELECT id, email, password_hash, first_name, last_name
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
}
