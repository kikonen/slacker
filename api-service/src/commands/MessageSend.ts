import express from 'express';

import { Kafka } from '../Kafka';
import { DB } from '../DB';

export class MessageSend {
  static async call(channelId: string, userId: string, text: string) {
    const topic = `channel_${channelId}`;

    console.log(`send: ${topic}`);

    const key = await DB.nextID();
    const msg = {
      content: text,
      user: userId,
    };
    console.log(msg);

    const kafka:Kafka = new Kafka(process.env.KAFKA_HOST);
    return kafka.publish(topic, key, msg);
  }

  static async handle(req: express.Request, jwt: any, channelId: string, text: string) {
    console.log("MSG", text);
    return this.call(channelId, jwt.user, text);
  }
}
