'use strict';

const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const Client = kafka.KafkaClient;

const jaasCfg = { mechanism: 'SCRAM-SHA-256', username: 'user', password: 'pass' };
const client = new Client({
    sslOptions: {},
    kafkaHost: 'host:port,host:port,host:pot', 
    clientId: 'nodejs', 
    sasl: jaasCfg,
});

const topic = [{ topic: 'topic' }];
const options = { autoCommit: false, groupId: 'node' };

const consumer = new Consumer(client, topic, options);

consumer.on('message', function (message) {
    console.log(message);
});

consumer.on('error', function (err) {
    console.log('error', err);
});

