import { NotifyService } from '@/tasks/application/protocols';
import { AddTaskRepository } from '@/tasks/application/protocols/add-task-repository';
import { Task } from '@/tasks/domain/protocols';
import { AddTask } from '@/tasks/domain/use-cases';

export class DbAddTask implements AddTask {
  constructor(
    private readonly addTaskRepository: AddTaskRepository,
    private readonly notifyService: NotifyService,
  ) {}

  async add(task: Task): Promise<boolean> {
    const addedTask = await this.addTaskRepository.addTask(task);

    if (addedTask) {
      try {
        this.notifyService.notify(task);
      } catch (error) {
        // send to sentry
        console.log(error);
        return addedTask;
      }
    }

    return addedTask;
  }
}
