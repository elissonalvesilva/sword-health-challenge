import dotenv from 'dotenv';
dotenv.config();

import { consumerNotify } from './function';

consumerNotify()
  .then(() => {
    console.log('STARTING CONSUMER');
  })
  .catch(console.error);
