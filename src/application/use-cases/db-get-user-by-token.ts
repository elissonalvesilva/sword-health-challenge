import { GetUserByToken } from '@/domain/use-cases/get-user-by-token';
import { GetUserByTokenRepository } from '@/application/protocols';
import { User } from '@/domain/protocols';

export class DbGetUserByToken implements GetUserByToken {
  constructor(private readonly getUserByToken: GetUserByTokenRepository) {}

  async get(token: string): Promise<Partial<User>> {
    const user = await this.getUserByToken.get(token);
    return user;
  }
}
