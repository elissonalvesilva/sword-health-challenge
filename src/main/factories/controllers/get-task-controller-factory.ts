import { GetTaskController } from '@/tasks/presentation/controllers';
import { Controller } from '@/tasks/presentation/protocols';
import { makeDbGet } from '@/main/factories/use-cases';

export const makeGetTaskController = (): Controller => {
  return new GetTaskController(makeDbGet());
};
