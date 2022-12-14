import fs from 'fs';
import path from 'path';

import { DbGetUserByToken } from '@/tasks/application/use-cases';
import { GetUserByToken } from '@/tasks/domain/use-cases';
import { AuthByJson } from '@/tasks/infra/auth';

export const makeGetUserByToken = (): GetUserByToken => {
  const json: string = fs.readFileSync(process.cwd() + '/users.json', 'utf8');
  const getUserByTokenImplementation = new AuthByJson(json);
  return new DbGetUserByToken(getUserByTokenImplementation);
};
