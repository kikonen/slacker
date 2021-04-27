import express from 'express';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';
import { Channel } from '../models/Channel';
import { ChannelMember } from '../models/ChannelMember';

import { UserFindAll } from '../commands/UserFindAll';
import { UserFind } from '../commands/UserFind';
import { UserCreate } from '../commands/UserCreate';
import { UserUpdate } from '../commands/UserUpdate';

// HACK KI ensure assocation is not dropped; fails queries if so
ChannelMember.toString();

/**
 * CRUD for User
 */
export class UsersController {
  static router = express.Router();

  static async index(req: express.Request, res: express.Response) {
    try {
      const users = await UserFindAll.call(req.query);

      res.json({ data: users });
    } catch(error) {
      console.log(error);
      res.status(404).json({ success: false, error: error });
    }
  }

  static async show(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const user = await UserFind.call(id);

      res.json({ data: user });
    } catch(error) {
      console.log(error);
      res.status(404).json({ success: false, error: error });
    }
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const user = await UserCreate.call(req.body);

      res.status(201).json({ success: true, data: user });
    } catch(error) {
      console.log(error);
      res.status(404).json({ success: false, error: error });
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const user = await UserUpdate.call(id, req.body);

      res.status(200).json({ success: true, data: user });
    } catch(error) {
      console.log(error);
      res.status(404).json({ success: false, error: error });
    }
  }

  static async destroy(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      let user = User.build({ id });

      await user.destroy();

      res.status(200).json({ success: true, data: { id } });
    } catch(error) {
      console.log(error);
      res.status(404).json({ success: false, error: error });
    }
  }

  static async findByEmail(req: express.Request, res: express.Response) {
    const { email } = req.query;

    console.log(`email: ${email}`);
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
        attributes: { exclude: USER_SECRETS },
        include: [
          Role,
          { model: Channel, as: 'channels', through: {attributes: []} }]
      });

      res.json({ data: user });
    } catch(error) {
      console.log(error);
      res.status(404).json({ success: false, error: error });
    }
  }
}

const router = UsersController.router;
router.get('/', UsersController.index);
router.get('/:id', UsersController.show);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.destroy);
router.get('/actions/find_email', UsersController.findByEmail);
