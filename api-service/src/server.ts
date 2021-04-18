import express from 'express';

import { Pool, PoolClient, Client } from 'pg';

import dotenv from 'dotenv'
import path from 'path';
import querystring from 'querystring';

import { Kafka } from './kafka';

dotenv.config();

const TEST_CHANNEL = 'channel_1';
const TEST_TOPIC = 'quickstart-events'

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3100', 10);

const pool = new Pool({
  max: 5,
});

app.get('/', (req, res) => {
  res.send('Hello World! Via typescript');
});

app.get('/bar', (req, res) => {
  res.send('Bar! Via typescript');
});

app.get('/roles', (req, res) => {
  let client:PoolClient = null;

  pool.connect()
    .then(c => {
      client = c;
      return client.query('SELECT id, name from roles');
    }).then( (rs) => {
      client.release();
      return rs;
    }).then(rs => {
      const roles = rs.rows;

      res.send(rs.rows);
    });
});

app.get('/send', (req, res) => {
  const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
  const message:string = req.query.message as string;
  kafka.publish(TEST_TOPIC, message);
  res.send({"success": true});
});

app.get('/send', (req, res) => {
});

app.get('/events', (req, res) => {
  console.log("events");
  sendSSEHeader(req, res);

  console.log("kafkaing...");
  const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
  kafka.subscribe(TEST_TOPIC, (event) => {
    console.log(event);
    sendSSE(res, event);
  });
});

function sendSSEHeader(req: any, res: any) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

//  res.write('retry: 10000\n\n');
}

function sendSSE(res: any, event: any) {
//  res.write('id: ' + id + '\n');
  res.write("data: " + event.value + '\n\n');
}

app.use((req, res, next) => {
  res.status(404);
  res.render("Nope");
});

app.listen(port, 'api', () => {
  console.log(`Listening at http://localhost:${port}`);
});
