import { Task } from '@/main/protocols';

export interface UpdateTaskRepository {
  updateTask(id: string, task: Task): Promise<boolean>;
}
