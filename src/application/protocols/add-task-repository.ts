import { Task } from 'domain/protocols';

export interface AddTaskRepository {
  addTask(task: Task): Promise<boolean>;
}
