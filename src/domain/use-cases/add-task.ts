import { Task } from 'domain/protocols/task';

export interface AddTask {
  add(task: Task): Promise<boolean>;
}
