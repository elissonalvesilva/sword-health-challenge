import { Task } from '@/main/protocols';

export interface NotifyService {
  notify(task: Task): Promise<boolean>;
}
