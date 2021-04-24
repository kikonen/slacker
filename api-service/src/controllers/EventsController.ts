import express from 'express';

import path from 'path';
import querystring from 'querystring';

import { URLSearchParams } from 'url';

import { JWTVerifier } from '../JWTVerifier';
import { Kafka } from '../Kafka';
import { DB } from '../DB';


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
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

export class EventsController {
  static async latest(req: express.Request, res: express.Response) {
    try {
      const payload = await JWTVerifier.verifyToken(req);
      const channelId = req.query.channel;
      const topic = `channel_${channelId}`;

      console.log(`latest events: ${topic}`);
      sendSSEHeader(req, res);

      console.log("kafkaing...");
      let groupId: string = payload.id;
      const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
      kafka.subscribe(topic, groupId, (event) => {
        console.log(event);
        sendSSE(res, event);
      });
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }

  static async history(req: express.Request, res: express.Response) {
    try {
      const payload = await JWTVerifier.verifyToken(req);

      const channelId = req.query.channel;
      const topic = `channel_${channelId}`;

      console.log(`history events: ${topic}`);
      sendSSEHeader(req, res);

      console.log("kafkaing...");
      let groupId: string = payload.id;
      const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
      kafka.subscribe(topic, groupId, (event) => {
        console.log(event);
        sendSSE(res, event);
      });
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }
}
