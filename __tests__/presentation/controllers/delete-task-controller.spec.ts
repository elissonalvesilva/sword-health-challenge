import { DeleteTask } from '@/domain/use-cases';
import { DeleteTaskController } from '@/presentation/controllers';
import { NotFoundParamError } from '@/presentation/errors';
import { badRequest, ok, serverError } from '@/presentation/helpers';
import { fake } from '@/utils';

const fakeTask = fake.fakeTask();
const makeDeleteTask = (): DeleteTask => {
  class DeleteTaskStub implements DeleteTask {
    delete(id: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new DeleteTaskStub();
};

interface ControllerStub {
  sut: DeleteTaskController;
  deleteTask: DeleteTask;
}

const makeSut = (): ControllerStub => {
  const deleteTask = makeDeleteTask();
  const sut = new DeleteTaskController(deleteTask);
  return {
    sut,
    deleteTask,
  };
};

describe('Delete Task', () => {
  describe('Delete Task Controller', () => {
    it('should return error when request delete task returns false (cant Delete task)', async () => {
      const { sut, deleteTask } = makeSut();

      jest
        .spyOn(deleteTask, 'delete')
        .mockReturnValueOnce(new Promise((resolve) => resolve(false)));

      const httpRequest = { id: 'some-id' };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(
        badRequest(new NotFoundParamError(httpRequest.id)),
      );
    });

    it('should return error when throws', async () => {
      const { sut, deleteTask } = makeSut();

      jest
        .spyOn(deleteTask, 'delete')
        .mockRejectedValueOnce(new Error('happen some error'));

      const httpRequest = {
        id: 'some-id',
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(serverError(new Error('happen some error')));
    });

    it('should return success on delete task', async () => {
      const { sut } = makeSut();

      const httpRequest = { id: 'some-id' };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(ok({ message: 'deleted' }));
    });
  });
});
