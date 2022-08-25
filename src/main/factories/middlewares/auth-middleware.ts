import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware';
import { Middleware } from '@/presentation/protocols';
import { makeGetUserByToken } from '@/main/factories/use-cases';

export const makeAuthMiddleware = (role: string): Middleware => {
  const getUserByToken = makeGetUserByToken();
  return new AuthMiddleware(getUserByToken, role);
};
