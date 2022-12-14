import { AuthMiddleware } from '@/tasks/presentation/middlewares/auth-middleware';
import { Middleware } from '@/tasks/presentation/protocols';
import { makeGetUserByToken } from '@/tasks/main/factories/use-cases';

export const makeAuthMiddleware = (role: string): Middleware => {
  const getUserByToken = makeGetUserByToken();
  return new AuthMiddleware(getUserByToken, role);
};
