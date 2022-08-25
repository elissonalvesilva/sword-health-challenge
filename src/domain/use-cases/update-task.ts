import { Task } from '@/domain/protocols';

export interface UpdateTask {
  update(id: string, task: Task): Promise<boolean>;
}
