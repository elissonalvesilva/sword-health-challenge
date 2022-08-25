import { DeleteTask } from '@/tasks/domain/use-cases';
import { TaskImplementation } from '@/tasks/infra/sequelize/mysql/implementations/task-implementation';
import { DbDeleteTask } from '@/tasks/application/use-cases';

export const makeDbDelete = (): DeleteTask => {
  const repository = new TaskImplementation();
  return new DbDeleteTask(repository);
};
