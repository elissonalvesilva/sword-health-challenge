export interface KafkaConfig {
  bootstrap: {
    servers: string;
  };
  dr_msg_cb: boolean;
  topic: string;
}
