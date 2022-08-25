import {
  AddTaskRepository,
  NotifyService,
} from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';
import { DbAddTask } from '@/tasks/application/use-cases';
import { fake } from '@/utils';

interface SutTypes {
  sut: DbAddTask;
  addTaskRepository: AddTaskRepository;
  notifyService: NotifyService;
}

const makeAddTaskRepository = (): AddTaskRepository => {
  class AddTaskRepositoryStub implements AddTaskRepository {
    addTask(_task: Task): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new AddTaskRepositoryStub();
};

const makeNotifyService = (): NotifyService => {
  class NotifyServiceStub implements NotifyService {
    notify(task: Task): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new NotifyServiceStub();
};

const makeSut = (): SutTypes => {
  const addTaskRepository = makeAddTaskRepository();
  const notifyService = makeNotifyService();
  const sut = new DbAddTask(addTaskRepository, notifyService);

  return {
    sut,
    addTaskRepository,
    notifyService,
  };
};

describe('DbAddTask UseCase', () => {
  describe('AddTaskRepository', () => {
    it('should call AddTaskRepository with correct values', async () => {
      const { sut, addTaskRepository } = makeSut();

      const addTaskRepositorySpy = jest.spyOn(addTaskRepository, 'addTask');
      const fakeTask = fake.fakeTask();
      await sut.add(fakeTask);

      expect(addTaskRepositorySpy).toBeCalledWith(fakeTask);
    });

    it('should call AddTaskRepository throws', async () => {
      const { sut, addTaskRepository } = makeSut();

      jest
        .spyOn(addTaskRepository, 'addTask')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );

      const fakeTask = fake.fakeTask();

      const promise = sut.add(fakeTask);
      await expect(promise).rejects.toThrow();
    });
  });
  describe('NotifyService', () => {
    it('should call NotifyService with correct values', async () => {
      const { sut, notifyService } = makeSut();

      const notifyServiceSpy = jest.spyOn(notifyService, 'notify');
      const fakeTask = fake.fakeTask();
      await sut.add(fakeTask);

      expect(notifyServiceSpy).toBeCalledWith(fakeTask);
    });

    it('should not return error when AddTaskRepository throws', async () => {
      const { sut, notifyService, addTaskRepository } = makeSut();

      jest
        .spyOn(addTaskRepository, 'addTask')
        .mockResolvedValueOnce(Promise.resolve(true));

      jest
        .spyOn(notifyService, 'notify')
        .mockImplementation(async () => Promise.reject(new Error('err')));
      const fakeTask = fake.fakeTask();
      const response = await sut.add(fakeTask);
      expect(response).toBe(true);
    });
  });
});
