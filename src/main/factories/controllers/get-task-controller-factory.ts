import { GetTaskController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeDbGet } from '@/main/factories/use-cases';

export const makeGetTaskController = (): Controller => {
  return new GetTaskController(makeDbGet());
};
