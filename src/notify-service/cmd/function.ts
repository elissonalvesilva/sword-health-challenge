import Kafka, { KafkaConsumer, Message } from 'node-rdkafka';
import { Task } from './../domain/protocol/task';

import { createConsumer } from '../infra/kafka';

import { config } from '../infra/kafka';

export async function consumerNotify(): Promise<void> {
  console.log(
    `================ READING TOPIC: ${config.topic}====================`,
  );

  const consumer: KafkaConsumer = await createConsumer(
    Kafka.KafkaConsumer,
    config,
    onData,
  );

  consumer.subscribe([config.topic]);
  consumer.consume();

  process.on('SIGINT', () => {
    console.log('\nDisconnecting consumer ...');
    consumer.disconnect();
  });
}

// callback to handle message delivery
function onData(data: Message): void {
  console.log(
    '============================= NOTIFY SERVICE ==================================',
  );
  if (data.value) {
    const message = JSON.parse(data.value.toString()!);
    if (message) {
      const task: Task = {
        user_id: message.user_id,
        resume: message.resume,
        createdAt: message.createdAt,
      };
      console.log(
        `The tech ${task.user_id} performed the task ${task.resume} on date ${task.createdAt}`,
      );
    }
  } else {
    console.error('Receive blank message');
  }
}
