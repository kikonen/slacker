import express from 'express';

import { Pool, PoolClient, Client } from 'pg';
import { QueryTypes } from 'sequelize';

import { DB } from './DB'
import { User, USER_SECRETS } from './models/User'
import { Role } from './models/Role'
import { Channel } from './models/Channel'
import { ChannelMember } from './models/ChannelMember'

import fs from 'fs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import path from 'path';
import querystring from 'querystring';

import { Kafka } from './kafka';

dotenv.config();

// HACK KI ensure assocation is not dropped; fails queries if so
ChannelMember.toString();

const TEST_TOPIC = 'channel_4';
//const TEST_TOPIC = 'quickstart-events'

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3100', 10);

const pool = new Pool({
  max: 5,
});

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World! Via typescript');
});

app.get('/channels', async (req, res) => {
  DB.connect();

  const channels = await Channel.findAll({
    include: {
      model: User,
      as: 'users',
      attributes: { exclude: USER_SECRETS },
      through: { attributes: [] }
    }
  });

  res.json({ data: channels });
});

app.get('/users', async (req, res) => {
  DB.connect();

  const users = await User.findAll({
    attributes: { exclude: USER_SECRETS },
    include: [
      Role,
      { model: Channel, as: 'channels', through: {attributes: []} }]
  });

  res.json({ data: users });
});

app.get('/roles', async (req, res) => {
  DB.connect();

  const roles = await Role.findAll({
    include: {
      model: User,
      as: 'users',
      attributes: { exclude: USER_SECRETS },
    }
  });

  res.json({ data: roles });
});

app.get('/bar', (req, res) => {
  res.send('Bar! Via typescript');
});

app.get('/send', (req, res) => {
  let token: string = req.cookies._slacker_auth;
  let decodedToken = jwt.decode(token)

  console.log("jwt: " + token);
  console.log(decodedToken);

  let privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
  jwt.verify(token, privateKey);
  console.log("JWT: VERIFIED KEY");

  const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
  const message:string = req.query.message as string;
  kafka.publish(TEST_TOPIC, message);
  res.send({"success": true});
});

app.get('/events', (req, res) => {
  let token: string = req.cookies._slacker_auth;
  let decodedToken = jwt.decode(token)
  let groupId: string = 'user_1';

  console.log("jwt: " + token);
  console.log(decodedToken);

  let privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
  jwt.verify(token, privateKey);
  console.log("JWT: VERIFIED KEY");

  console.log("events");
  sendSSEHeader(req, res);

  console.log("kafkaing...");
  const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
  kafka.subscribe(TEST_TOPIC, groupId, (event) => {
    console.log(event);
    sendSSE(res, event);
  });
});

function sendSSEHeader(req: any, res: any) {
  res.status(200);
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders(); // flush the headers to establish SSE with client

  res.write('retry: 10000\n\n');
}

function sendSSE(res: any, event: any) {
//  res.write('id: ' + id + '\n');
  // res.write() instead of res.send()
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

app.use((req, res, next) => {
  res.status(404);
  res.json({"success": false});
});

app.listen(port, 'api', () => {
  console.log(`Listening at http://localhost:${port}`);
});
