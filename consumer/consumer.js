const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`]
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const TOPIC = 'test-topic';

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  console.log('[CONSUMER] Waiting for messages...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        key: message.key.toString(),
        value: message.value.toString(),
        timestamp: message.timestamp,
      });
    },
  });
};

run().catch(err => {
  console.error('[CONSUMER] Error:', err);
  process.exit(1);
});