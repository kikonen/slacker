import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';

export class RoleFindAll {
  static async call(query: any) {
    return Role.findAll({
      include: {
        model: User,
        as: 'users',
        attributes: { exclude: USER_SECRETS },
      }
    });
  }
}
