import { faker } from '@faker-js/faker';

import { Task } from '@/domain/protocols';

export const fake = {
  fakeTask(): Task {
    return {
      id: faker.datatype.uuid(),
      resume: faker.lorem.paragraph(),
      user_id: faker.datatype.uuid(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };
  },
};
