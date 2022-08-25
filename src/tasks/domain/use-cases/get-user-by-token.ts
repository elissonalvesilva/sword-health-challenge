import { User } from '@/tasks/domain/protocols';

export interface GetUserByToken {
  get(token: string): Promise<Partial<User>>;
}
