import { TaskImplementation } from '@/infra/sequelize/mysql/implementations/task-implementation';
import { GetTask } from '@/domain/use-cases';
import { DbGetTask } from '@/application/use-cases';

export const makeDbGet = (): GetTask => {
  const repository = new TaskImplementation();
  return new DbGetTask(repository);
};
