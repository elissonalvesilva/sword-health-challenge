import { Task } from '@/tasks/domain/protocols';

export interface UpdateTask {
  update(id: string, task: Task): Promise<boolean>;
}
