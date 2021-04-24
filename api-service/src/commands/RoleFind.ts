import { Channel } from '../models/Channel';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';

export class RoleFind {
  static async call(id: string) {
    return Role.findByPk(
      id,
      {
        attributes: { exclude: USER_SECRETS },
        include: [
          Role,
          { model: Channel, as: 'channels', through: {attributes: []} }]
      });
  }
}
