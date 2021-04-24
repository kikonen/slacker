import { Channel } from '../models/Channel';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';

export class UserFindAll {
  static async call(query: any) {
    return User.findAll({
      attributes: { exclude: USER_SECRETS },
      include: [
        Role,
        { model: Channel, as: 'channels', through: {attributes: []} }]
    });
  }
}
