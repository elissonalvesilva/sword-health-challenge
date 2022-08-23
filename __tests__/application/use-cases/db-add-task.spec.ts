import { AddTaskRepository } from "application/protocols";
import { Task } from "domain/protocols";
import { DbAddTask } from "application/use-cases";
import { fake } from "utils";

interface SutTypes {
  sut: DbAddTask;
  addTaskRepository: AddTaskRepository
}

const makeAddTaskRepository = (): AddTaskRepository => {
  class AddTaskRepositoryStub implements AddTaskRepository {
    addTask(task: Task): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new AddTaskRepositoryStub();
}


const makeSut = (): SutTypes => {
  const addTaskRepository = makeAddTaskRepository();
  const sut = new DbAddTask(addTaskRepository);

  return {
    sut,
    addTaskRepository,
  }
};

describe('DbAddTask UseCase', () => {
  describe('AddTaskRepository', () => {
    it('should call AddTaskRepository with correct values', async () => {
      const {sut, addTaskRepository} = makeSut();

      const addTaskRepositorySpy = jest.spyOn(
        addTaskRepository,
        'addTask',
      );
      const fakeTask = fake.fakeTask();
      await sut.add(fakeTask);

      expect(addTaskRepositorySpy).toBeCalledWith(
        fakeTask
      )
    });
  });
});
