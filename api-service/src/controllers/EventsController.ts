import express from 'express';

import path from 'path';
import querystring from 'querystring';

import { URLSearchParams } from 'url';

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
  console.log("SSE", event);
  res.write(`data: ${JSON.stringify(event)}\n\n`);
  return true;
}

function convertMessage(event: any) {
  let msg = JSON.parse(event.value);
  msg.id = event.key;
  msg.channel = event.topic.replace(/.*_/, '');
  msg.offset = event.offset;
  msg.highWaterOffset = event.highWaterOffset;
  return msg;
}

export class EventsController {
  static router = express.Router();

  static async commit(req: express.Request, res: express.Response) {
    res.status(500).json({ "success": false, error: "NYI!" });
  }

  static async latest(req: express.Request, res: express.Response) {
    try {
      const channelId = req.query.channel;
      const topic = `channel_${channelId}`;

      let closed = false;

      res.socket.on('close', (e: any) => {
        closed = true;
        console.log('SSE CLOSED');
        res.end();
      });

      res.on('error', function(error) {
        closed = true;
        console.log('SSE FAILED');
        console.log(error);
      });

      console.log(`latest events: ${topic}`);
      sendSSEHeader(req, res);

      console.log("============== kafkaing...");
      let groupId: string = `user_${res.locals.slacker_jwt.id}`;
      const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
      kafka.subscribe(topic, groupId, (event: any) => {
        if (closed) return false;
        //console.log(event);
        return sendSSE(res, convertMessage(event));
      });
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }

  static async history(req: express.Request, res: express.Response) {
    try {
      const channelId = req.query.channel;
      const topic = `channel_${channelId}`;

      console.log(`history events: ${topic}`);
      sendSSEHeader(req, res);

      console.log("kafkaing...");
      let groupId: string = `user_${res.locals.slacker_jwt.id}`;
      const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
      kafka.subscribe(topic, groupId, (event: any) => {
        console.log("EVENT", event);
        sendSSE(res, event);
      });
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }
}

const router = EventsController.router;
router.post('/commit', EventsController.commit);
router.get('/latest', EventsController.latest);
router.get('/history', EventsController.history);
