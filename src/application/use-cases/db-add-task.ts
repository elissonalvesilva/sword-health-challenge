import { NotifyService } from '@/application/protocols';
import { AddTaskRepository } from '@/application/protocols/add-task-repository';
import { Task } from '@/domain/protocols';
import { AddTask } from '@/domain/use-cases';

export class DbAddTask implements AddTask {
  constructor(
    private readonly addTaskRepository: AddTaskRepository,
    private readonly notifyService: NotifyService,
  ) {}

  async add(task: Task): Promise<boolean> {
    const addedTask = await this.addTaskRepository.addTask(task);

    if (addedTask) {
      try {
        await this.notifyService.notify(task);
      } catch (error) {
        // send to sentry
        console.log(error);
      }
    }

    return addedTask;
  }
}
