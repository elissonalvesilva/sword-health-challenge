import { Task } from '@/domain/protocols';

export interface AddTask {
  add(task: Task): Promise<boolean>;
}
