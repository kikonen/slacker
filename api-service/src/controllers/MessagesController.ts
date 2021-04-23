import express from 'express';

import fs from 'fs';
import jwt from 'jsonwebtoken';

import path from 'path';
import querystring from 'querystring';

import { URLSearchParams } from 'url';

import { Kafka } from '../kafka';


const TEST_TOPIC = 'channel_4';
//const TEST_TOPIC = 'quickstart-events'


function sendSSEHeader(req: express.Request, res: express.Response) {
  res.status(200);
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders(); // flush the headers to establish SSE with client

  res.write('retry: 10000\n\n');
}

function sendSSE(res: express.Response, event: any) {
  //  res.write('id: ' + id + '\n');
  // res.write() instead of res.send()
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

export class MessagesController {
  static async send(req: express.Request, res: express.Response) {
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
  }

  static async events(req: express.Request, res: express.Response) {
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
  }
}
