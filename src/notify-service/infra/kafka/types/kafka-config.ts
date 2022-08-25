export interface IKafkaConfig {
  bootstrap: {
    servers: string;
  };
  dr_msg_cb: boolean;
  topic: string;
  group: {
    id: string;
  };
  auto: {
    offset: {
      reset:
        | 'smallest'
        | 'earliest'
        | 'beginning'
        | 'largest'
        | 'latest'
        | 'end'
        | 'error';
    };
  };
}
