import express from 'express';

import { Channel } from '../models/Channel';
import { ChannelMember } from '../models/ChannelMember';

export class ChannelLeave {
  static async call(channelId: string, userId: string) {
    let member = await ChannelMember.findOne({
      where: {
        channel_id: channelId,
        user_id: userId
      }
    });

    console.log("FOUND", member);
    await member.destroy();

    console.log("LEAVED", member);

//    return ChannelMember.call(.id);
    return { data: member };
  }

  static async handle(
    req: express.Request,
    res: express.Response,
    channelId: string,
    key: string,
    text: string) {
    console.log("LEAVE", text);

    let channel = await Channel.findOne({
      where: {
        name: text,
      }
    });
    return ChannelLeave.call(channel.id, res.locals.slacker_jwt.id);
  }
}
