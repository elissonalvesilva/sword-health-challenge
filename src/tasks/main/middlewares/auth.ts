import { adaptMiddleware } from '@/tasks/main/adapters/express-middleware-adapter';
import { makeAuthMiddleware } from '@/tasks/main/factories/middlewares';

export const auth = adaptMiddleware(makeAuthMiddleware('user'));
