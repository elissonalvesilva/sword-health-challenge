import { GetUserByTokenRepository } from '@/application/protocols';
import { User } from '@/domain/protocols';

export class AuthByJson implements GetUserByTokenRepository {
  constructor(private readonly json: string) {}

  async get(token: string): Promise<Partial<User>> {
    const rawData = JSON.parse(this.json);
    const user = rawData.filter((u: any) => u.token === token);
    return user;
  }
}