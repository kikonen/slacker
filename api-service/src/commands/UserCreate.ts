import { User } from '../models/User';

import { UserFind } from './UserFind';

export class UserCreate {
  static async call(data: any) {
    let user = User.build(data);
    user = await user.save();

    console.log("SAVED", user);

    return UserFind.call(user.id);
  }
}
