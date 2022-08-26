import { faker } from '@faker-js/faker';

import { GetUserByTokenRepository } from '@/tasks/application/protocols';
import { User } from '@/tasks/domain/protocols';
import { DbGetUserByToken } from '@/tasks/application/use-cases';

const makeUserByTokenRepository = (): GetUserByTokenRepository => {
  class GetUserByTokenRepositoryStub implements GetUserByTokenRepository {
    get(id: string): Promise<Partial<User>> {
      return Promise.resolve(null);
    }
  }
  return new GetUserByTokenRepositoryStub();
};

interface SutTypes {
  sut: DbGetUserByToken;
  getUserByTokenRepository: GetUserByTokenRepository;
}

const makeSut = (): SutTypes => {
  const getUserByTokenRepository = makeUserByTokenRepository();
  const sut = new DbGetUserByToken(getUserByTokenRepository);
  return {
    sut,
    getUserByTokenRepository,
  };
};

describe('GetUserByToken', () => {
  describe('GetUserByTokenRepository', () => {
    it('should call get with correct values', async () => {
      const { sut, getUserByTokenRepository } = makeSut();

      const getUserByTokenRepositorySpy = jest.spyOn(
        getUserByTokenRepository,
        'get',
      );
      const fakeToken = faker.datatype.uuid();
      await sut.get(fakeToken);

      expect(getUserByTokenRepositorySpy).toBeCalledWith(fakeToken);
    });

    it('should call get throws', async () => {
      const { sut, getUserByTokenRepository } = makeSut();

      jest
        .spyOn(getUserByTokenRepository, 'get')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );
      const fakeToken = faker.datatype.uuid();
      const promise = sut.get(fakeToken);
      await expect(promise).rejects.toThrow();
    });
  });
});
