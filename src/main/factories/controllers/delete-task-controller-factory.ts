import { DeleteTaskController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeDbDelete } from '@/main/factories/use-cases';

export const makeDeleteTaskController = (): Controller => {
  return new DeleteTaskController(makeDbDelete());
};
