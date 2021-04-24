import { Channel } from '../models/Channel';
import { User, USER_SECRETS } from '../models/User'

export class ChannelFind {
  static async call(id: string) {
    return Channel.findByPk(
      id,
      {
        include: {
          model: User,
          as: 'users',
          attributes: { exclude: USER_SECRETS },
          through: { attributes: [] }
        }
      });
  }
}
