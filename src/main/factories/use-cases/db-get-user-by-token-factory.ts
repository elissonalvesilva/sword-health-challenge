import fs from 'fs';

import { DbGetUserByToken } from '@/application/use-cases';
import { GetUserByToken } from '@/domain/use-cases';
import { AuthByJson } from '@/infra/auth';

export const makeGetUserByToken = (): GetUserByToken => {
  const json: string = fs.readFileSync(__dirname + 'user.json', 'utf8');
  const getUserByTokenImplementation = new AuthByJson(json);
  return new DbGetUserByToken(getUserByTokenImplementation);
};
