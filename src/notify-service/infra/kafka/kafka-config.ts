import { IKafkaConfig } from '@/notify-service/infra/kafka/types/kafka-config';

export const config: IKafkaConfig = {
  bootstrap: {
    servers: <string>process.env.BOOTSTRAP_SERVERS,
  },
  dr_msg_cb: true,
  topic: <string>process.env.TOPIC,
  auto: {
    offset: {
      reset: <
        | 'smallest'
        | 'earliest'
        | 'beginning'
        | 'largest'
        | 'latest'
        | 'end'
        | 'error'
      >process.env.AUTO_OFFSET_RESET,
    },
  },
  group: {
    id: <string>process.env.GROUP_ID,
  },
};
