import { TaskEntity } from 'domain/entity';
import { AddTask } from 'domain/use-cases';
import {
  CantCreateTaskError,
  InvalidResumeMaxLengthError,
  InvalidResumeMinLengthError,
  MissingParamError,
} from 'presentation/errors';
import { badRequest, ok, serverError } from 'presentation/helpers';
import { HttpResponse } from 'presentation/protocols';
import { Controller } from 'presentation/protocols';

export class CreateTaskController implements Controller {
  constructor(private readonly createTask: AddTask) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['resume'];

      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (request?.resume.trim() === '') {
        return badRequest(new InvalidResumeMinLengthError());
      }

      const entity = new TaskEntity();
      const [task, created] = entity.create(request.resume);
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
