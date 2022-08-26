import Kafka, { Producer } from 'node-rdkafka';

import { NotifyService } from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';
import { KafkaConfig } from '@/tasks/infra/kafka/types/kafka-config';
import { createProducer } from '@/tasks/infra/kafka/producer';

export class NotifyImplementation implements NotifyService {
  constructor(
    private readonly topic: string,
    private readonly config: KafkaConfig,
  ) {}

  async notify(task: Task): Promise<void> {
    console.log(
      '========================== NOTIFY SERVICE ===========================',
    );
    try {
      const producer: Producer = await createProducer(
        Kafka.Producer,
        this.config,
      );
      const message = Buffer.from(JSON.stringify(task));
      producer.produce(this.topic, -1, message, task.user_id, Date.now());
      // return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      // return Promise.resolve(false);
    }
  }
}
