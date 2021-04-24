import { Channel } from '../models/Channel';
import { User, USER_SECRETS } from '../models/User'

export class ChannelFindAll {
  static async call(query: any) {
    return Channel.findAll({
      include: {
        model: User,
        as: 'users',
        attributes: { exclude: USER_SECRETS },
        through: { attributes: [] }
      }
    });
  }
}
