import { UpdateTaskRepository } from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';
import { DbUpdateTask } from '@/tasks/application/use-cases';
import { fake } from '@/utils';

interface SutTypes {
  sut: DbUpdateTask;
  updateTaskRepository: UpdateTaskRepository;
}

const fakeTask = fake.fakeTask();
const makeUpdateTaskRepository = (): UpdateTaskRepository => {
  class UpdateTaskRepositoryStub implements UpdateTaskRepository {
    updateTask(id: string, task: Task): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new UpdateTaskRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updateTaskRepository = makeUpdateTaskRepository();
  const sut = new DbUpdateTask(updateTaskRepository);

  return {
    sut,
    updateTaskRepository,
  };
};

describe('DbUpdateTask UseCase', () => {
  describe('UpdateTaskRepository updateTask', () => {
    it('should call updateTask with correct values', async () => {
      const { sut, updateTaskRepository } = makeSut();

      const updateTaskRepositorySpy = jest.spyOn(
        updateTaskRepository,
        'updateTask',
      );
      const fakeId = '123-fake-id';
      await sut.update(fakeId, fakeTask);

      expect(updateTaskRepositorySpy).toBeCalledWith(fakeId, fakeTask);
    });

    it('should call updateTask throws', async () => {
      const { sut, updateTaskRepository } = makeSut();

      jest
        .spyOn(updateTaskRepository, 'updateTask')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );

      const promise = sut.update('123-fake-id', fakeTask);
      await expect(promise).rejects.toThrow();
    });
  });
});
