import { GetAllTasksController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeDbGet } from '@/main/factories/use-cases';

export const makeGetAllTasksController = (): Controller => {
  return new GetAllTasksController(makeDbGet());
};
