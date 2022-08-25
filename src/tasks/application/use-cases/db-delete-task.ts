import { DeleteTaskRepository } from '@/tasks/application/protocols';
import { DeleteTask } from '@/tasks/domain/use-cases';

export class DbDeleteTask implements DeleteTask {
  constructor(private readonly deleteTaskRepository: DeleteTaskRepository) {}

  async delete(id: string): Promise<boolean> {
    const deletedTask = await this.deleteTaskRepository.deleteTask(id);
    return deletedTask;
  }
}
