import Kafka, { KafkaConsumer, Message } from 'node-rdkafka';
import { IKafkaConfig } from '@/notify-service/infra/kafka/types/kafka-config';

export function createConsumer(
  kafkaConsumer: typeof Kafka.KafkaConsumer,
  config: IKafkaConfig,
  onDataCallback: (data: Message) => void,
): Promise<KafkaConsumer> {
  const consumer: KafkaConsumer = new Kafka.KafkaConsumer(
    {
      'bootstrap.servers': config.bootstrap.servers,
      'group.id': config.group.id,
    },
    {
      'auto.offset.reset': config.auto.offset.reset,
    },
  );

  return new Promise((resolve, reject) => {
    consumer.on('ready', () => resolve(consumer)).on('data', onDataCallback);

    consumer.connect();
  });
}
