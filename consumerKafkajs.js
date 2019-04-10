const { Kafka, logLevel } = require('kafkajs');

const jaasCfg = { mechanism: 'SCRAM-SHA-256', username: 'user', password: 'pass' };
const kafka = new Kafka({
    ssl: 'SASL_SSL',
    logLevel: logLevel.INFO,
    clientId: 'node',
    brokers: ['host:port','host:port', 'host:port'],
    sasl: jaasCfg
});

const consumer = kafka.consumer({ groupId: 'node' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'topic' });
    await consumer.run({
      // eachBatch: async ({ batch }) => {
      //   console.log(batch)
      // },
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
      },
    })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))