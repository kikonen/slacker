import express from 'express';

import { Channel } from '../models/Channel';
import { ChannelMember } from '../models/ChannelMember';

export class ChannelJoin {
  static async call(channelId: string, userId: string) {
    let member = ChannelMember.build({ channel_id: channelId, user_id: userId });
    member = await member.save();

    console.log("JOINED", member);

//    return ChannelMember.call(.id);
    return { data: member };
  }

  static async handle(
    req: express.Request,
    res: express.Response,
    channelId: string,
    text: string) {
    console.log("JOIN", text);

    let channel = await Channel.findOne({
      where: {
        name: text,
      }
    });
    return ChannelJoin.call(channel.id, res.locals.slacker_jwt.id);
  }
}
