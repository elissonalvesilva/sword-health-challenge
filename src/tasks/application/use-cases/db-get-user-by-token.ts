import { GetUserByToken } from '@/tasks/domain/use-cases/get-user-by-token';
import { GetUserByTokenRepository } from '@/tasks/application/protocols';
import { User } from '@/tasks/domain/protocols';

export class DbGetUserByToken implements GetUserByToken {
  constructor(private readonly getUserByToken: GetUserByTokenRepository) {}

  async get(token: string): Promise<Partial<User>> {
    const user = await this.getUserByToken.get(token);
    return user;
  }
}
