import { AddTaskRepository } from "application/protocols/add-task-repository";
import { Task } from "domain/protocols";
import { AddTask } from "domain/use-cases";

export class DbAddTask implements AddTask {
  constructor(private readonly addTaskRepository: AddTaskRepository){}

  async add(task: Task): Promise<boolean> {

    const addedTask = await this.addTaskRepository.addTask(task);

    return addedTask;
  }

}
