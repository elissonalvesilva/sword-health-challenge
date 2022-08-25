import { User } from '@/tasks/domain/protocols';

export interface GetUserByTokenRepository {
  get(id: string): Promise<Partial<User>>;
}
