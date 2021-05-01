import express from 'express';

import { Kafka } from '../Kafka';
import { DB } from '../DB';

export class MessageSend {
  static async call(channelId: string, userId: string, key: string, text: string) {
    if (!channelId) {
      throw "Channel missing";
    }

    const topic = `channel_${channelId}`;
    const dt_str = new Date().toISOString();

    console.log(`send: ${topic}`);

    let msg;
    if (key) {
      msg = {
        updated_at: dt_str,
        content: text,
        user: userId,
      };
    } else {
      msg = {
        create_at: dt_str,
        content: text,
        user: userId,
      };
      key = await DB.nextID();
    }

    console.log(key, msg);

    const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
    return kafka.publish(topic, key, msg);
  }

  static async handle(
    req: express.Request,
    res: express.Response,
    channelId: string,
    key: string,
    text: string) {
    console.log("MSG", text);
    return this.call(channelId, res.locals.slacker_jwt.id, key, text);
  }
}
