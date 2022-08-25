import { Router } from 'express';

import { adaptRoute } from '@/tasks/main/adapters/express-router-adapter';
import { makeCreateTaskController } from '@/tasks/main/factories/controllers/create-task-controller-factory';
import { makeDeleteTaskController } from '@/tasks/main/factories/controllers/delete-task-controller-factory';
import { makeGetAllTasksController } from '@/tasks/main/factories/controllers/get-all-tasks-controller-factory';
import { makeGetTaskController } from '@/tasks/main/factories/controllers/get-task-controller-factory';
import { makeUpdateTaskController } from '@/tasks/main/factories/controllers/update-task-controller-factory';
import { adminAuth, auth } from '@/tasks/main/middlewares';

export default (router: Router): void => {
  router.post('/task', auth, adaptRoute(makeCreateTaskController()));
  router.get('/tasks', adminAuth, adaptRoute(makeGetAllTasksController()));
  router.get('/task/:id', auth, adaptRoute(makeGetTaskController()));
  router.put('/task/:id', auth, adaptRoute(makeUpdateTaskController()));
  router.delete('/task/:id', adminAuth, adaptRoute(makeDeleteTaskController()));
};
