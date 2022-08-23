import { GetTask } from "domain/use-cases";
import { MissingParamError, NotFoundParamError } from "presentation/errors";
import { badRequest, ok, serverError } from "presentation/helpers";
import { HttpResponse } from "presentation/protocols";
import { Controller } from "presentation/protocols";

export class GetTaskController implements Controller {

  constructor(private readonly getTask: GetTask){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['id'];

      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const task = await this.getTask.get(request.id);

      if(Object.keys(task).length === 0) {
        return badRequest(new NotFoundParamError(request.id));
      }

      return ok(task)
    } catch (error) {
      return serverError(error as Error);
    }
  }

}
