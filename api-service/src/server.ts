import express from 'express';

import { Pool, PoolClient, Client } from 'pg';
import expressWs from 'express-ws';

import dotenv from 'dotenv'
import path from 'path';
import querystring from 'querystring';

import { Kafka } from './kafka';

dotenv.config();

const TEST_CHANNEL = 'channel_1';

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
  kafka.publishMessage(TEST_CHANNEL, message);
});

app.get('/send', (req, res) => {
});

app.ws('/receive', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.render("Nope");
});

app.listen(port, 'api', () => {
  console.log(`Listening at http://localhost:${port}`);
});
