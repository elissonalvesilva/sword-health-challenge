import { Task } from 'domain/protocols';

export const MAX_LENGTH_RESUME = 2500;
export class TaskEntity {
  constructor() {}

  create(resume: string): [Task, boolean] {
    if (resume.length > 2500) {
      return [null as any, false];
    }

    return [
      {
        resume,
        createdAt: new Date(),
      },
      true,
    ];
  }
}
