import { faker } from "@faker-js/faker";
import { Task } from "domain/protocols";
import { GetTask } from "domain/use-cases";
import { GetTaskController } from "presentation/controllers";
import { MissingParamError, NotFoundParamError } from "presentation/errors";
import { badRequest, ok, serverError } from "presentation/helpers";
import { fake } from "utils";

const fakeTask = fake.fakeTask();
const makeGetTask = (): GetTask => {
  class GetTaskStub implements GetTask {
    getAll(): Promise<Task[]> {
      return Promise.resolve([fakeTask])
    }
    get(id: string): Promise<Task> {
      return Promise.resolve(fakeTask)
    }

  }
  return new GetTaskStub();
}

interface ControllerStub {
  sut: GetTaskController;
  getTask: GetTask
}

const makeSut = (): ControllerStub => {
  const getTask = makeGetTask();
  const sut = new GetTaskController(getTask);
  return {
    sut,
    getTask,
  };
};

describe('Get Task', ()=> {
  describe('Get Task Controller', () => {
    it('should return error when request didnt pass id', async () => {
      const { sut } = makeSut();

      const httpRequest = {
        resume: faker.lorem,
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')));
    });

    it('should return error when request Getd task returns false (cant Get task)', async () => {
      const { sut, getTask } = makeSut();

      jest.spyOn(getTask, 'get').mockReturnValueOnce(new Promise((resolve) => resolve({})));

      const httpRequest = {id: 'some-id'};

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new NotFoundParamError(httpRequest.id)));
    });

    it('should return error when throws', async () => {
      const { sut, getTask } = makeSut();

      jest.spyOn(getTask, 'get').mockRejectedValueOnce(new Error('happen some error'));

      const httpRequest = {
        id: 'some-id'
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(serverError(new Error('happen some error')));
    });

    it('should return success on Get task', async () => {
      const { sut } = makeSut();

      const httpRequest = {id: 'some-id'};

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(ok(fakeTask));
    });
  });
});
