import { faker } from '@faker-js/faker';
import { MAX_LENGTH_RESUME } from '@/tasks/domain/entity';
import { Task } from '@/tasks/domain/protocols';
import { AddTask } from '@/tasks/domain/use-cases';
import { CreateTaskController } from '@/tasks/presentation/controllers';
import {
  CantCreateTaskError,
  InvalidResumeMaxLengthError,
  InvalidResumeMinLengthError,
  MissingParamError,
} from '@/tasks/presentation/errors';
import { badRequest, ok, serverError } from '@/tasks/presentation/helpers';

const makeAddTask = (): AddTask => {
  class AddTaskStub implements AddTask {
    add(task: Task): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new AddTaskStub();
};

interface ControllerStub {
  sut: CreateTaskController;
  addTask: AddTask;
}

const makeSut = (): ControllerStub => {
  const addTask = makeAddTask();
  const sut = new CreateTaskController(addTask);
  return {
    sut,
    addTask,
  };
};

describe('Create Task', () => {
  describe('Create Task Controller', () => {
    it('should return error when request didnt pass resume', async () => {
      const { sut } = makeSut();

      const httpRequest = {};

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new MissingParamError('resume')));
    });
    it('should return error when request resume contains blank space', async () => {
      const { sut } = makeSut();

      const httpRequest = {
        resume: ' ',
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(
        badRequest(new InvalidResumeMinLengthError()),
      );
    });
    it('should return error when request didnt pass user_id', async () => {
      const { sut } = makeSut();

      const httpRequest = {
        id: 'some-id',
        resume: faker.lorem,
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(
        badRequest(new MissingParamError('user_id')),
      );
    });
    it('should return error when request resume characteres is greater than 2500', async () => {
      const { sut } = makeSut();

      const resume =
        faker.datatype.string(MAX_LENGTH_RESUME) +
        faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(
        badRequest(new InvalidResumeMaxLengthError(resume.length)),
      );
    });

    it('should return error when request created task returns false (cant create task)', async () => {
      const { sut, addTask } = makeSut();

      jest.spyOn(addTask, 'add').mockReturnValueOnce(Promise.resolve(false));

      const resume = faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new CantCreateTaskError()));
    });

    it('should return error when throws', async () => {
      const { sut, addTask } = makeSut();

      jest
        .spyOn(addTask, 'add')
        .mockRejectedValueOnce(new Error('happen some error'));

      const resume = faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(serverError(new Error('happen some error')));
    });

    it('should return success on create task', async () => {
      const { sut, addTask } = makeSut();

      jest.spyOn(addTask, 'add').mockReturnValueOnce(Promise.resolve(true));

      const resume = faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(ok({ message: 'created' }));
    });
  });
});
