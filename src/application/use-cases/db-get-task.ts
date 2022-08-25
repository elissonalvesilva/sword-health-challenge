import { GetTaskRepository } from '@/application/protocols';
import { Task } from '@/domain/protocols';
import { GetTask } from '@/domain/use-cases';

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
