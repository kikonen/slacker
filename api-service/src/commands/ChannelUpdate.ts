import { Channel } from '../models/Channel';

import { ChannelFind } from './ChannelFind';

export class ChannelUpdate {
  static async call(id: string, data: any) {
    console.log(data);

    let channel = await Channel.findByPk(id);

    const { name } = data;
    channel.name = name;

    channel = await channel.save();

    return ChannelFind.call(id);
  }
}
