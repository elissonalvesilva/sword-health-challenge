import { GetAllTasksController } from '@/tasks/presentation/controllers';
import { Controller } from '@/tasks/presentation/protocols';
import { makeDbGet } from '@/main/factories/use-cases';

export const makeGetAllTasksController = (): Controller => {
  return new GetAllTasksController(makeDbGet());
};
