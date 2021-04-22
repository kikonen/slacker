import express from 'express';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';
import { Channel } from '../models/Channel';
import { ChannelMember } from '../models/ChannelMember';

// HACK KI ensure assocation is not dropped; fails queries if so
ChannelMember.toString();

/**
 * CRUD for User
 */
export class UsersController {
  static async index(req: express.Request, res: express.Response) {
    try {
      DB.connect();

      const users = await User.findAll({
        attributes: { exclude: USER_SECRETS },
        include: [
          Role,
          { model: Channel, as: 'channels', through: {attributes: []} }]
      });

      res.json({ data: users });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async show(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(
        id,
        {
          attributes: { exclude: USER_SECRETS },
          include: [
            Role,
            { model: Channel, as: 'channels', through: {attributes: []} }]
        });

      res.json({ data: user });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      console.log(req.body);

      let user = User.build(req.body);
      user = await user.save();

      console.log(user);

      user = await User.findByPk(
        user.id,
        {
          attributes: { exclude: USER_SECRETS },
          include: [
            Role,
            { model: Channel, as: 'channels', through: {attributes: []} }]
        });

      res.status(201).json({ success: true, data: user });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      console.log(req.body);

      let user = await User.findByPk(id);

      const { name, email } = req.body;
      user.name = name;
      user.email = email;

      user = await user.save();

      res.status(200).json({ success: true, data: user });
    } catch(error) {
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
      res.status(404).json({ success: false, error: error });
    }
  }
}
