import { DeleteTaskRepository } from "application/protocols/delete-task-repository";
import { DeleteTask } from "domain/use-cases/delete-task";

export class DbDeleteTask implements DeleteTask {

  constructor(private readonly deleteTaskRepository: DeleteTaskRepository){}

  async delete(id: string): Promise<boolean> {
    const deletedTask = await this.deleteTaskRepository.deleteTask(id);
    return deletedTask;
  }

}
