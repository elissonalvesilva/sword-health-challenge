import { LibrdKafkaError, DeliveryReport, Producer } from 'node-rdkafka';
import { KafkaConfig } from '@/tasks/infra/kafka/types/kafka-config';
import Kafka from 'node-rdkafka';

export async function createProducer(
  kafkaProducer: typeof Kafka.Producer,
  config: KafkaConfig,
): Promise<Producer> {
  const producer: Producer = new kafkaProducer({
    'bootstrap.servers': config.bootstrap.servers,
    dr_msg_cb: true,
    'log.connection.close': true,
  });

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => {
        resolve(producer);
      })
      .on('delivery-report', onDeliveryCallback)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      })
      .on('disconnected', function (arg) {
        console.log('producer disconnected. ' + JSON.stringify(arg));
      })
      .on('event.log', function (log) {
        console.log(log);
      });

    producer.connect();
  });
}

function onDeliveryCallback(
  err: LibrdKafkaError,
  report: DeliveryReport,
): void {
  if (err) {
    console.warn('Error producing', err);
  } else {
    const { topic, partition, value } = report;
    console.log(
      `Successfully produced record to topic "${topic}" partition ${partition} ${value}`,
    );
  }
}
