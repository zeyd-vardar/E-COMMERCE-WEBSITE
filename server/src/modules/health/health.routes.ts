import { Router } from 'express';
import { asyncHandler } from '../../shared/http/async-handler.js';
import { getHealthController } from './health.controller.js';

export const healthRouter = Router();

healthRouter.get('/', asyncHandler(getHealthController));
