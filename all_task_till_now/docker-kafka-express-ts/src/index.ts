import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
const port = 3000;

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'], // Replace with your Kafka broker(s) information
});

const admin = kafka.admin();
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-group' });

admin.connect();
admin.createTopics({
  topics:[{
    topic:"myapp",
    numPartitions: 1,
    replicationFactor:1,
  }]
})

app.use(express.json());

// Producer endpoint
app.post('/produce', async (req, res) => {
  const { message } = req.body;

  await producer.connect();
  await producer.send({
    topic: 'myapp', // Replace with your topic name
    messages: [{ value: message }],
  });

  res.json({ status: 'Message sent successfully' });
  await producer.disconnect();
});

// Consumer endpoint
app.get('/consume', async (req, res) => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'myapp', fromBeginning: true }); // Replace with your topic name
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        if (message && message.value) {
          console.log({
            value: message.value.toString(),
            partition,
            offset: message.offset,
          });
        }
      },      
  });

  res.json({ status: 'Consumer started' });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

process.on('SIGINT', async () => {
  await admin.disconnect();
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
});
