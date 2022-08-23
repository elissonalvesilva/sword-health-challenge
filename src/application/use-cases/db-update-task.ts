import { UpdateTaskRepository } from "application/protocols";
import { Task } from "domain/protocols";
import { UpdateTask } from "domain/use-cases";

export class DbUpdateTask implements UpdateTask {
  constructor(private readonly updateTaskRepository: UpdateTaskRepository){}

  async update(id: string, task: Task): Promise<boolean> {
    const updatedTask = await this.updateTaskRepository.updateTask(id, task);
    return updatedTask;
  }

}
