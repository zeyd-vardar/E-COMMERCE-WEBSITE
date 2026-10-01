import { executeQuery } from '../../core/database/postgres.js';

export async function checkDatabaseConnection(): Promise<void> {
  await executeQuery('SELECT 1');
}
