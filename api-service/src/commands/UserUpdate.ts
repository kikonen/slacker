import { User } from '../models/User'

import { UserFind } from './UserFind';

export class UserUpdate {
  static async call(id: string, data: any) {
    console.log(data);

    let user = await User.findByPk(id);

    const { name, email } = data;
    user.name = name;
    user.email = email;

    user = await user.save();

    return UserFind.call(id);
  }
}
