import { TaskEntity } from '@/tasks/domain/entity';
import { AddTask } from '@/tasks/domain/use-cases';
import {
  CantCreateTaskError,
  InvalidResumeMaxLengthError,
  InvalidResumeMinLengthError,
  MissingParamError,
} from '@/tasks/presentation/errors';
import { badRequest, ok, serverError } from '@/tasks/presentation/helpers';
import { HttpResponse } from '@/tasks/presentation/protocols';
import { Controller } from '@/tasks/presentation/protocols';

export class CreateTaskController implements Controller {
  constructor(private readonly createTask: AddTask) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['resume', 'user_id'];

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

      const createdTask = await this.createTask.add(task);

      if (!createdTask) {
        return badRequest(new CantCreateTaskError());
      }

      return ok({ message: 'created' });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
