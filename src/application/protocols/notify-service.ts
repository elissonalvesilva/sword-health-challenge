import { Task } from '@/domain/protocols';

export interface NotifyService {
  notify(task: Task): Promise<boolean>;
}
