import { TaskEntity } from '@/tasks/domain/entity';
import { UpdateTask } from '@/tasks/domain/use-cases';
import {
  CantUpdateTaskError,
  InvalidResumeMaxLengthError,
  InvalidResumeMinLengthError,
  MissingParamError,
} from '@/tasks/presentation/errors';
import { badRequest, ok, serverError } from '@/tasks/presentation/helpers';
import { HttpResponse } from '@/tasks/presentation/protocols';
import { Controller } from '@/tasks/presentation/protocols';

export class UpdateTaskController implements Controller {
  constructor(private readonly updateTask: UpdateTask) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['id', 'resume', 'user_id'];

      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (request?.resume.trim() === '') {
        return badRequest(new InvalidResumeMinLengthError());
      }

      const entity = new TaskEntity();
      const [task, created] = entity.create(request.resume, request.user_id);
      if (!created) {
        return badRequest(
          new InvalidResumeMaxLengthError(request.resume.length),
        );
      }

      const updatedTask = await this.updateTask.update(request.id, task);

      if (!updatedTask) {
        return badRequest(new CantUpdateTaskError());
      }

      return ok({ message: 'updated' });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
