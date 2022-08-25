import { Task } from '@/tasks/domain/protocols';
import { GetTask } from '@/tasks/domain/use-cases';
import { GetAllTasksController } from '@/tasks/presentation/controllers';
import { ok, serverError } from '@/tasks/presentation/helpers';
import { fake } from '@/utils';

const fakeTask = fake.fakeTask();
const makeGetTask = (): GetTask => {
  class GetTaskStub implements GetTask {
    getAll(): Promise<Task[]> {
      return Promise.resolve([fakeTask]);
    }
    get(id: string): Promise<Task> {
      return Promise.resolve(fakeTask);
    }
  }
  return new GetTaskStub();
};

interface ControllerStub {
  sut: GetAllTasksController;
  getTask: GetTask;
}

const makeSut = (): ControllerStub => {
  const getTask = makeGetTask();
  const sut = new GetAllTasksController(getTask);
  return {
    sut,
    getTask,
  };
};

describe('Get All Task', () => {
  describe('Get All Task Controller', () => {
    it('should return error when getAll throws', async () => {
      const { sut, getTask } = makeSut();

      jest
        .spyOn(getTask, 'getAll')
        .mockRejectedValueOnce(new Error('happen some error'));

      const httpRequest = {};

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(serverError(new Error('happen some error')));
    });

    it('should return success on Get all tasks', async () => {
      const { sut, getTask } = makeSut();

      jest.spyOn(getTask, 'getAll').mockResolvedValueOnce([fakeTask]);

      const httpRequest = {};

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(ok([fakeTask]));
    });
  });
});
