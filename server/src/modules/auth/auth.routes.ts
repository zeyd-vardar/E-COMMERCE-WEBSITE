import { Router } from 'express';
import { asyncHandler } from '../../shared/http/async-handler.js';
import { loginController, registerController } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', asyncHandler(registerController));
authRouter.post('/login', asyncHandler(loginController));
