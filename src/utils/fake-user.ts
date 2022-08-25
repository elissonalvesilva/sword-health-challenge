import { faker } from '@faker-js/faker';
import { User } from '@/domain/protocols';

export const fakeUser = {
  makeFake(): User {
    return {
      token: faker.datatype.uuid(),
      actions: ['create', 'update', 'list'],
      role: 'user',
    };
  },
  makeFakeAdmin(): User {
    return {
      token: faker.datatype.uuid(),
      actions: ['delete', 'list', 'list-all'],
      role: 'admin',
    };
  },
};
