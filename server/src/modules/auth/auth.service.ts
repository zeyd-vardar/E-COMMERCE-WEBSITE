import bcrypt from 'bcryptjs';
import { createAccessToken } from '../../middlewares/auth.middleware.js';
import { HttpError } from '../../shared/errors/http-error.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';
import { findUserByEmail, insertUser } from './auth.repository.js';

interface AuthResult {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await insertUser({
    email: input.email.toLowerCase(),
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
  });

  return toAuthResult(user);
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const user = await findUserByEmail(input.email.toLowerCase());
  const passwordMatches =
    user && (await bcrypt.compare(input.password, user.password_hash));

  if (!user || !passwordMatches) {
    throw new HttpError(401, 'E-posta veya şifre hatalı.');
  }

  return toAuthResult(user);
}

function toAuthResult(user: {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}): AuthResult {
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    },
    token: createAccessToken({ id: user.id, email: user.email }),
  };
}
