import { adaptMiddleware } from '@/main/adapters/exporess-middleware-adapter';
import { makeAuthMiddleware } from '@/main/factories/middlewares';

export const auth = adaptMiddleware(makeAuthMiddleware('user'));
