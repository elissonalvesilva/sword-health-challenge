import { Task } from '@/tasks/domain/protocols';

export interface AddTask {
  add(task: Task): Promise<boolean>;
}
