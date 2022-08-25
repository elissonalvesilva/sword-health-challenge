import { AddTask } from '@/tasks/domain/use-cases';
import { TaskImplementation } from '@/tasks/infra/sequelize/mysql/implementations/task-implementation';
import { DbAddTask } from '@/tasks/application/use-cases';
import { NotifyImplementation } from '@/tasks/infra/services/notify-service-implementation';

export const makeDbAdd = (): AddTask => {
  const repository = new TaskImplementation();
  const notify = new NotifyImplementation();
  return new DbAddTask(repository, notify);
};
