import { CreateTaskController } from '@/tasks/presentation/controllers';
import { Controller } from '@/tasks/presentation/protocols';
import { makeDbAdd } from '@/main/factories/use-cases';

export const makeCreateTaskController = (): Controller => {
  return new CreateTaskController(makeDbAdd());
};
