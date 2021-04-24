import express from 'express';

import path from 'path';
import querystring from 'querystring';

import { URLSearchParams } from 'url';

import { JWTVerifier } from '../JWTVerifier';
import { Kafka } from '../Kafka';
import { DB } from '../DB';

export class CommandsController {
  static router = express.Router();

  static async send(req: express.Request, res: express.Response) {
    try {
      const payload = await JWTVerifier.verifyToken(req);

      const text = req.query.text;
      const channelId = req.query.channel;
      const topic = `channel_${channelId}`;

      console.log(`send command: ${topic}`);

      const key = await DB.nextID();
      const msg = {
        content: text,
        user: payload.id,
      };
      console.log(msg);

      const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
      kafka.publish(topic, key, msg);
      res.send({"success": true});
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }
}

const router = CommandsController.router;
router.post('/send', CommandsController.send);
