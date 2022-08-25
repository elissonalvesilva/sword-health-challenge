import { TaskImplementation } from '@/infra/sequelize/mysql/implementations/task-implementation';
import { DbUpdateTask } from '@/application/use-cases';
import { UpdateTask } from '@/domain/use-cases';

export const makeDbUpdate = (): UpdateTask => {
  const repository = new TaskImplementation();
  return new DbUpdateTask(repository);
};
