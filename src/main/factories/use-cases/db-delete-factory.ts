import { DeleteTask } from '@/domain/use-cases';
import { TaskImplementation } from '@/infra/sequelize/mysql/implementations/task-implementation';
import { DbDeleteTask } from '@/application/use-cases';

export const makeDbDelete = (): DeleteTask => {
  const repository = new TaskImplementation();
  return new DbDeleteTask(repository);
};
