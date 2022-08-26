import dotenv from 'dotenv';
dotenv.config();

import { consumerNotify } from './function';

consumerNotify()
  .then(() => {
    console.log('CONSUMER READY');
  })
  .catch(console.error);
