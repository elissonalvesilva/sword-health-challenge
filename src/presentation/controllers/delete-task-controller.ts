import { DeleteTask } from '@/domain/use-cases';
import { MissingParamError, NotFoundParamError } from '@/presentation/errors';
import { badRequest, ok, serverError } from '@/presentation/helpers';
import { HttpResponse } from '@/presentation/protocols';
import { Controller } from '@/presentation/protocols';

export class DeleteTaskController implements Controller {
  constructor(private readonly deleteTask: DeleteTask) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['id'];

      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const deleted = await this.deleteTask.delete(request.id);

      if (!deleted) {
        return badRequest(new NotFoundParamError(request.id));
      }

      return ok({ message: 'deleted' });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
