import { Task } from '@/tasks/domain/protocols/task';

export interface GetTask {
  getAll(): Promise<Partial<Task[]>>;
  get(id: string): Promise<Partial<Task>>;
}
