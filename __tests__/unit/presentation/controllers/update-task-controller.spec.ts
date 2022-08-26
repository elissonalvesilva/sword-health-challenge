import { faker } from '@faker-js/faker';
import { MAX_LENGTH_RESUME } from '@/tasks/domain/entity';
import { Task } from '@/tasks/domain/protocols';
import { UpdateTask } from '@/tasks/domain/use-cases';
import { UpdateTaskController } from '@/tasks/presentation/controllers';
import {
  CantUpdateTaskError,
  InvalidResumeMaxLengthError,
  InvalidResumeMinLengthError,
  MissingParamError,
} from '@/tasks/presentation/errors';
import { badRequest, ok, serverError } from '@/tasks/presentation/helpers';

const makeUpdateTask = (): UpdateTask => {
  class UpdateTaskStub implements UpdateTask {
    update(id: string, task: Task): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new UpdateTaskStub();
};

interface ControllerStub {
  sut: UpdateTaskController;
  updateTask: UpdateTask;
}

const makeSut = (): ControllerStub => {
  const updateTask = makeUpdateTask();
  const sut = new UpdateTaskController(updateTask);
  return {
    sut,
    updateTask,
  };
};

describe('Update Task', () => {
  describe('Update Task Controller', () => {
    it('should return error when request didnt pass id', async () => {
      const { sut } = makeSut();

      const httpRequest = {
        resume: faker.lorem,
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')));
    });
    it('should return error when request didnt pass resume', async () => {
      const { sut } = makeSut();

      const httpRequest = {
        id: 'some-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new MissingParamError('resume')));
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
    it('should return error when request resume contains blank space', async () => {
      const { sut } = makeSut();

      const httpRequest = {
        id: 'some-id',
        resume: ' ',
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(
        badRequest(new InvalidResumeMinLengthError()),
      );
    });

    it('should return error when request resume characteres is greater than 2500', async () => {
      const { sut } = makeSut();

      const resume =
        faker.datatype.string(MAX_LENGTH_RESUME) +
        faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        id: 'some-id',
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(
        badRequest(new InvalidResumeMaxLengthError(resume.length)),
      );
    });

    it('should return error when request Updated task returns false (cant Update task)', async () => {
      const { sut, updateTask } = makeSut();

      jest
        .spyOn(updateTask, 'update')
        .mockReturnValueOnce(Promise.resolve(false));

      const resume = faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        id: 'some-id',
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new CantUpdateTaskError()));
    });

    it('should return error when throws', async () => {
      const { sut, updateTask } = makeSut();

      jest
        .spyOn(updateTask, 'update')
        .mockRejectedValueOnce(new Error('happen some error'));

      const resume = faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        id: 'some-id',
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(serverError(new Error('happen some error')));
    });

    it('should return success on Update task', async () => {
      const { sut, updateTask } = makeSut();

      jest
        .spyOn(updateTask, 'update')
        .mockReturnValueOnce(Promise.resolve(true));

      const resume = faker.datatype.string(MAX_LENGTH_RESUME);
      const httpRequest = {
        id: 'some-id',
        resume,
        user_id: 'user-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(ok({ message: 'updated' }));
    });
  });
});
