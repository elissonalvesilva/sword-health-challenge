import { Task } from '@/tasks/domain/protocols';

export interface GetTaskRepository {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
}
