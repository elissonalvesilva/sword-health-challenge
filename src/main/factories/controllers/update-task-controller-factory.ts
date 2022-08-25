import { UpdateTaskController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeDbUpdate } from '@/main/factories/use-cases';

export const makeUpdateTaskController = (): Controller => {
  return new UpdateTaskController(makeDbUpdate());
};
