import { Channel } from '../models/Channel';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';

export class UserFind {
  static async call(id: string) {
    return User.findByPk(
      id,
      {
        attributes: { exclude: USER_SECRETS },
        include: [
          Role,
          { model: Channel, as: 'channels', through: {attributes: []} }]
      });
  }
}
