import { GetUserByToken } from '@/domain/use-cases';
import { AccessDeniedError, ServerError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { HttpResponse, Middleware } from '@/presentation/protocols';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly getUserByToken: GetUserByToken,
    private readonly role: string,
  ) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { user_token } = httpRequest;
      if (user_token) {
        const user = await this.getUserByToken.get(user_token);
        if (user && user.role === this.role) {
          return ok({ user_token: user.token });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(new ServerError());
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    user_token: string;
  };
}
