# Sword health challenge

## Tecnologies
  - Node
  - Typescript
  - Kakfa (node-rdkafka)
  - Mysql
  - Docker
  - Jest
  - Nodemon

## Project

### Steps
Follows steps below:

1 - Create .env file as the .env.sample file
```
PORT = 4513

DATABASE_NAME = todo
DATABASE_USER = todo
DATABASE_PASS = secret
DATABASE_HOST = database_tasks
DATABASE_PORT = 3306

BOOTSTRAP_SERVERS = "kafka_notify:9092"
TOPIC=TASKS
GROUP_ID=task_group
AUTO_OFFSET_RESET=earliest

```

2 - Build Image
```
docker-compose build
```
**Obs: maybe here the node-rdkafka makes the build to take time to finish**

3 - Run app
```
docker-compose up -d
```


### Logs
 - Consumer Logs:

```
docker logs -f consumer -t
```

 - API Logs:
```
docker logs -f api -t
```

 - Kafka Logs:
```
docker logs -f kafka_notify -t
```

### Test
```
docker-compose run api npm test
```

### Implement on the future

 - Outbox events pattern (if all brokers (when exists) save all messages in DB and after that kafka will consumer the new messages from db using debezium)
 - Implements Kubernetes deployment
 - Add Sonarcloud



