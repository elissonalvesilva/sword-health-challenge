import { DeleteTaskController } from '@/tasks/presentation/controllers';
import { Controller } from '@/tasks/presentation/protocols';
import { makeDbDelete } from '@/main/factories/use-cases';

export const makeDeleteTaskController = (): Controller => {
  return new DeleteTaskController(makeDbDelete());
};
