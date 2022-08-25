import { AddTask } from '@/domain/use-cases';
import { TaskImplementation } from '@/infra/sequelize/mysql/implementations/task-implementation';
import { DbAddTask } from '@/application/use-cases';
import { NotifyImplementation } from '@/infra/services/notify-service-implementation';

export const makeDbAdd = (): AddTask => {
  const repository = new TaskImplementation();
  const notify = new NotifyImplementation();
  return new DbAddTask(repository, notify);
};
