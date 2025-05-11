const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`]
});

const producer = kafka.producer();

const TOPIC = 'test-topic';

const run = async () => {
  await producer.connect();
  
  let messageCount = 0;
  
  // Envoyer un message toutes les 3 secondes
  setInterval(async () => {
    try {
      messageCount++;
      const message = `Message #${messageCount} - Hello Kafka at ${new Date().toISOString()}`;
      
      await producer.send({
        topic: TOPIC,
        messages: [
          { 
            key: `key-${messageCount}`,
            value: message 
          },
        ],
      });
      
      console.log(`[PRODUCER] Message sent: ${message}`);
    } catch (err) {
      console.error('[PRODUCER] Failed to send message', err);
    }
  }, 3000);
};

run().catch(err => {
  console.error('[PRODUCER] Error:', err);
  process.exit(1);
});