import { UpdateTaskRepository } from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';
import { UpdateTask } from '@/tasks/domain/use-cases';

export class DbUpdateTask implements UpdateTask {
  constructor(private readonly updateTaskRepository: UpdateTaskRepository) {}

  async update(id: string, task: Task): Promise<boolean> {
    const updatedTask = await this.updateTaskRepository.updateTask(id, task);
    return updatedTask;
  }
}
