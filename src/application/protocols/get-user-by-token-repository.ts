import { User } from '@/domain/protocols';

export interface GetUserByTokenRepository {
  get(id: string): Promise<Partial<User>>;
}
