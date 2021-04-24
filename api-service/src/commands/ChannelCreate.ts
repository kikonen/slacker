import { Channel } from '../models/Channel';

import { ChannelFind } from './ChannelFind';

export class ChannelCreate {
  static async call(data: any) {
    let channel = Channel.build(data);
    channel = await channel.save();

    console.log("SAVED", channel);

    return ChannelFind.call(channel.id);
  }
}
