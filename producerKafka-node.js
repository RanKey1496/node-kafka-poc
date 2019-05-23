const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Client = kafka.KafkaClient;

const client = new Client({
    kafkaHost: process.env.HOST,
    clientId: 'nodejs',
});

const payloads = [
    {
        topic: 'testing',
        messages: `Sopa de macaco ${new Date()}`
    }
];

const producer = new Producer(client);

producer.on('ready', async function() {
    let push_status = producer.send(payloads, (err, data) => {
        if (err) {
            console.log('[-]: broker update failed');
        } else {
            console.log('[+]: broker update success');
        }
    })
});

producer.on('error', function(err) {
    console.log('error', err);
});