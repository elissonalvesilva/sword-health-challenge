import { AddTask } from '@/tasks/domain/use-cases';
import { TaskImplementation } from '@/tasks/infra/sequelize/mysql/implementations/task-implementation';
import { DbAddTask } from '@/tasks/application/use-cases';
import { NotifyImplementation } from '@/tasks/infra/services/notify-service-implementation';
import { makeKafkaConfig } from '@/tasks/main/factories/infra';

export const makeDbAdd = (): AddTask => {
  const topic = 'TASKS';
  const kafkaConfig = makeKafkaConfig();
  const repository = new TaskImplementation();
  const notify = new NotifyImplementation(topic, kafkaConfig);
  return new DbAddTask(repository, notify);
};
