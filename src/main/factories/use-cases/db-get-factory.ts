import { TaskImplementation } from '@/tasks/infra/sequelize/mysql/implementations/task-implementation';
import { GetTask } from '@/tasks/domain/use-cases';
import { DbGetTask } from '@/tasks/application/use-cases';

export const makeDbGet = (): GetTask => {
  const repository = new TaskImplementation();
  return new DbGetTask(repository);
};
