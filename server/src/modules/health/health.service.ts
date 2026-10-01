import { checkDatabaseConnection } from './health.repository.js';

export interface HealthStatus {
  status: 'ok';
  service: string;
  timestamp: string;
}

export async function getHealthStatus(): Promise<HealthStatus> {
  await checkDatabaseConnection();

  return {
    status: 'ok',
    service: 'aurea-api',
    timestamp: new Date().toISOString(),
  };
}
