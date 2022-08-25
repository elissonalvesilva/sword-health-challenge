import { DeleteTaskRepository } from '@/application/protocols';
import { DeleteTask } from '@/domain/use-cases';

export class DbDeleteTask implements DeleteTask {
  constructor(private readonly deleteTaskRepository: DeleteTaskRepository) {}

  async delete(id: string): Promise<boolean> {
    const deletedTask = await this.deleteTaskRepository.deleteTask(id);
    return deletedTask;
  }
}
