import { Task } from '@/tasks/domain/protocols';

export interface NotifyService {
  notify(task: Task): Promise<void>;
}
