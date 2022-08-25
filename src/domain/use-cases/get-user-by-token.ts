import { User } from '@/domain/protocols';

export interface GetUserByToken {
  get(token: string): Promise<Partial<User>>;
}
