import { DeleteTaskRepository } from "application/protocols";
import { Task } from "domain/protocols";
import { DbDeleteTask } from "application/use-cases";
import { fake } from "utils";

interface SutTypes {
  sut: DbDeleteTask;
  deleteTaskRepository: DeleteTaskRepository
}

const fakeTask = fake.fakeTask();
const makeDeleteTaskRepository = (): DeleteTaskRepository => {
  class DeleteTaskRepositoryStub implements DeleteTaskRepository {
    deleteTask(id: string): Promise<boolean> {
      return Promise.resolve(true);
    }

  }
  return new DeleteTaskRepositoryStub();
}


const makeSut = (): SutTypes => {
  const deleteTaskRepository = makeDeleteTaskRepository();
  const sut = new DbDeleteTask(deleteTaskRepository);

  return {
    sut,
    deleteTaskRepository,
  }
};

describe('DbDeleteTask UseCase', () => {
  describe('DeleteTaskRepository deleteTask', () => {
    it('should call deleteTask with correct values', async () => {
      const { sut, deleteTaskRepository } = makeSut();

      const deleteTaskRepositorySpy = jest.spyOn(
        deleteTaskRepository,
        'deleteTask',
      );
      const fakeId = '123-fake-id';
      await sut.delete(fakeId);

      expect(deleteTaskRepositorySpy).toBeCalledWith(fakeId);
    });

    it('should call deleteTask throws', async () => {
      const { sut, deleteTaskRepository } = makeSut();

      jest
      .spyOn(deleteTaskRepository, 'deleteTask')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

      const promise = sut.delete('123-fake-id')
      await expect(promise).rejects.toThrow();
    });
  });
});
