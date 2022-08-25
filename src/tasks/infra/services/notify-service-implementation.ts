import { NotifyService } from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';

export class NotifyImplementation implements NotifyService {
  notify(task: Task): Promise<boolean> {
    console.log(
      '========================== NOTIFY SERVICE ===========================',
    );
    console.log(
      `Technician ${task.user_id} performed task ${task.resume} on Z ${task.createdAt}`,
    );
    return Promise.resolve(true);
  }
}
