import { User } from '@/tasks/domain/protocols';
import { GetUserByToken } from '@/tasks/domain/use-cases';
import { AccessDeniedError } from '@/tasks/presentation/errors';
import { forbidden, ok } from '@/tasks/presentation/helpers';
import { AuthMiddleware } from '@/tasks/presentation/middlewares';
import { fakeUser } from '@/utils';

const makeGetUserByToken = (): GetUserByToken => {
  class GetUserByTokenStub implements GetUserByToken {
    get(token: string): Promise<Partial<User>> {
      return Promise.resolve(fakeUser.makeFake());
    }
  }
  return new GetUserByTokenStub();
};

describe('AuthMiddleware', () => {
  it('should return error if user_token didnt provided', async () => {
    const sut = new AuthMiddleware(makeGetUserByToken(), 'user');
    const httpRequest = { user_token: '' };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('should return error if user_token not found', async () => {
    const getUserByToken = makeGetUserByToken();
    const fake = fakeUser.makeFake();
    const fakeWrong = fakeUser.makeFakeAdmin();

    jest
      .spyOn(getUserByToken, 'get')
      .mockResolvedValueOnce(Promise.resolve(fakeWrong));

    const sut = new AuthMiddleware(getUserByToken, 'user');
    const httpRequest = {
      user_token: fake.token,
    };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('should return user_token on success', async () => {
    const getUserByToken = makeGetUserByToken();
    const fake = fakeUser.makeFake();

    jest
      .spyOn(getUserByToken, 'get')
      .mockResolvedValueOnce(Promise.resolve(fake));

    const sut = new AuthMiddleware(getUserByToken, 'user');
    const httpRequest = {
      user_token: fake.token,
    };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(ok({ user_token: fake.token }));
  });
});
