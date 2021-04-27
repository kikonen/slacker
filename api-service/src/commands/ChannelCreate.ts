import { Channel } from '../models/Channel';

import { ChannelFind } from './ChannelFind';

export class ChannelCreate {
  static async call(data: any) {
    console.log(data);
    let channel = Channel.build(data);
    channel.name = channel.name || 'noname';

    channel = await channel.save();

    console.log("SAVED", channel);

    return ChannelFind.call(channel.id);
  }
}
