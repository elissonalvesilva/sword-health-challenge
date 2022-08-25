import { GetTaskRepository } from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';
import { GetTask } from '@/tasks/domain/use-cases';

export class DbGetTask implements GetTask {
  constructor(private readonly getTaskRepository: GetTaskRepository) {}

  async getAll(): Promise<Task[]> {
    const tasks = await this.getTaskRepository.getAllTasks();
    return tasks;
  }

  async get(id: string): Promise<Task> {
    const tasks = await this.getTaskRepository.getTaskById(id);
    return tasks;
  }
}
