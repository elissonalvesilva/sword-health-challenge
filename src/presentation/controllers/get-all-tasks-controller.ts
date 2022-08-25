import { GetTask } from '@/domain/use-cases';
import { ok, serverError } from '@/presentation/helpers';
import { HttpResponse } from '@/presentation/protocols';
import { Controller } from '@/presentation/protocols';

export class GetAllTasksController implements Controller {
  constructor(private readonly getTask: GetTask) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const tasks = await this.getTask.getAll();
      return ok(tasks);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
