import { Task } from '@/tasks/domain/protocols';

export interface UpdateTaskRepository {
  updateTask(id: string, task: Task): Promise<boolean>;
}
