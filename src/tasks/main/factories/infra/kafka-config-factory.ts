import 'dotenv/config';
import { KafkaConfig } from '@/tasks/infra/kafka/types/kafka-config';

export const makeKafkaConfig = (): KafkaConfig => {
  const config: KafkaConfig = {
    bootstrap: {
      servers: <string>process.env.BOOTSTRAP_SERVERS,
    },
    dr_msg_cb: true,
    topic: <string>process.env.TOPIC,
  };

  return config;
};
