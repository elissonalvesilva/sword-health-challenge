import { DeleteTask } from '@/tasks/domain/use-cases';
import {
  MissingParamError,
  NotFoundParamError,
} from '@/tasks/presentation/errors';
import { badRequest, ok, serverError } from '@/tasks/presentation/helpers';
import { HttpResponse } from '@/tasks/presentation/protocols';
import { Controller } from '@/tasks/presentation/protocols';

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
