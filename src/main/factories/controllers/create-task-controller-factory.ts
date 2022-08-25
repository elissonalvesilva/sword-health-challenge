import { CreateTaskController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeDbAdd } from '@/main/factories/use-cases';

export const makeCreateTaskController = (): Controller => {
  return new CreateTaskController(makeDbAdd());
};
