import express from 'express';

import { Kafka } from '../Kafka';
import { DB } from '../DB';

import { MessageSend } from './MessageSend';

export class TopicCreate {
  static async call(channelId: string, userId: string) {
    const topic = `channel_${channelId}`;

    const kafka = new Kafka(process.env.KAFKA_HOST);
    const response = kafka.createTopic(topic);
    console.log(response);

    await MessageSend.call(channelId, userId, "First message...");
  }
}
