import express from 'express';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';
import { Channel } from '../models/Channel';
import { ChannelMember } from '../models/ChannelMember';

import { UserFind } from '../commands/UserFind';

// HACK KI ensure assocation is not dropped; fails queries if so
ChannelMember.toString();

/**
 * Basic API for current session user
 */
export class SessionUserController {
  static async show(req: express.Request, res: express.Response) {
    const { id } = res.locals.slacker_jwt;
    try {
      const user = await UserFind.call(id);

      res.json({ data: user });
    } catch(error) {
      console.log(error);
      res.status(404).json({ success: false, error: error });
    }
  }
}
