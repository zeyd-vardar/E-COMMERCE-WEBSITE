import type { Request, Response } from 'express';
import { getHealthStatus } from './health.service.js';

export async function getHealthController(
  _request: Request,
  response: Response,
): Promise<void> {
  const status = await getHealthStatus();
  response.json(status);
}
