import { GetTaskRepository } from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';
import { DbGetTask } from '@/tasks/application/use-cases';
import { fake } from '@/utils';

interface SutTypes {
  sut: DbGetTask;
  getTaskRepository: GetTaskRepository;
}

const fakeTask = fake.fakeTask();
const makeGetTaskRepository = (): GetTaskRepository => {
  class getTaskRepositoryStub implements GetTaskRepository {
    getAllTasks(): Promise<Task[]> {
      return Promise.resolve([fakeTask]);
    }
    getTaskById(id: string): Promise<Task> {
      return Promise.resolve(fakeTask);
    }
  }
  return new getTaskRepositoryStub();
};

const makeSut = (): SutTypes => {
  const getTaskRepository = makeGetTaskRepository();
  const sut = new DbGetTask(getTaskRepository);

  return {
    sut,
    getTaskRepository,
  };
};

describe('DbAddTask UseCase', () => {
  describe('GetTaskRepository getAll', () => {
    it('should call getAll with correct values', async () => {
      const { sut, getTaskRepository } = makeSut();

      const getTaskRepositorySpy = jest.spyOn(getTaskRepository, 'getAllTasks');
      await sut.getAll();

      expect(getTaskRepositorySpy).toBeCalledWith();
    });

    it('should call getAll throws', async () => {
      const { sut, getTaskRepository } = makeSut();

      jest
        .spyOn(getTaskRepository, 'getAllTasks')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );

      const promise = sut.getAll();
      await expect(promise).rejects.toThrow();
    });
  });
  describe('GetTaskRepository getTaskById', () => {
    it('should call getAll with correct values', async () => {
      const { sut, getTaskRepository } = makeSut();

      const getTaskRepositorySpy = jest.spyOn(getTaskRepository, 'getTaskById');
      await sut.get('fake-id');

      expect(getTaskRepositorySpy).toBeCalledWith('fake-id');
    });

    it('should call getAll throws', async () => {
      const { sut, getTaskRepository } = makeSut();

      jest
        .spyOn(getTaskRepository, 'getTaskById')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );

      const promise = sut.get('fake-id');
      await expect(promise).rejects.toThrow();
    });
  });
});
