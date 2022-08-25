import { NotifyService } from '@/application/protocols';
import { Task } from '@/domain/protocols';

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
