import { Task } from '@/main/protocols';

export interface AddTaskRepository {
  addTask(task: Task): Promise<boolean>;
}
