import { UpdateTaskController } from '@/tasks/presentation/controllers';
import { Controller } from '@/tasks/presentation/protocols';
import { makeDbUpdate } from '@/main/factories/use-cases';

export const makeUpdateTaskController = (): Controller => {
  return new UpdateTaskController(makeDbUpdate());
};
