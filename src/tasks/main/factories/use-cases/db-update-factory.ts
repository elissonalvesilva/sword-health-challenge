import { TaskImplementation } from '@/tasks/infra/sequelize/mysql/implementations/task-implementation';
import { DbUpdateTask } from '@/tasks/application/use-cases';
import { UpdateTask } from '@/tasks/domain/use-cases';

export const makeDbUpdate = (): UpdateTask => {
  const repository = new TaskImplementation();
  return new DbUpdateTask(repository);
};
