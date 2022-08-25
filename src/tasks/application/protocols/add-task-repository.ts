import { Task } from '@/tasks/domain/protocols';

export interface AddTaskRepository {
  addTask(task: Task): Promise<boolean>;
}
