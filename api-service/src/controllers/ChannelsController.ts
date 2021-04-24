import express from 'express';

import { JWTVerifier } from '../JWTVerifier';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Channel } from '../models/Channel';
import { ChannelMember } from '../models/ChannelMember';

// HACK KI ensure assocation is not dropped; fails queries if so
ChannelMember.toString();

/**
 * CRUD for Channel
 */
export class ChannelsController {
  static async index(req: express.Request, res: express.Response) {
    try {
      const payload = await JWTVerifier.verifyToken(req);

      const channels = await Channel.findAll({
        include: {
          model: User,
          as: 'users',
          attributes: { exclude: USER_SECRETS },
          through: { attributes: [] }
        }
      });

      res.json({ data: channels });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async show(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const payload = await JWTVerifier.verifyToken(req);

      const channel = await Channel.findByPk(
        id,
        {
          include: {
            model: User,
            as: 'users',
            attributes: { exclude: USER_SECRETS },
            through: { attributes: [] }
          }
        });

      res.json({ data: channel });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const payload = await JWTVerifier.verifyToken(req);

      console.log(req.body);

      let channel = Channel.build(req.body);
      channel = await channel.save();

      console.log(channel);

      channel = await Channel.findByPk(
        channel.id,
        {
          include: {
            model: User,
            as: 'users',
            attributes: { exclude: USER_SECRETS },
            through: { attributes: [] }
          }
        });

      res.status(201).json({ success: true, data: channel });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const payload = await JWTVerifier.verifyToken(req);

      console.log(req.body);

      let channel = await Channel.findByPk(id);

      const { name } = req.body;
      channel.name = name;

      channel = await channel.save();

      res.status(200).json({ success: true, data: channel });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async destroy(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const payload = await JWTVerifier.verifyToken(req);

      let channel = Channel.build({ id });

      await channel.destroy();

      res.status(200).json({ success: true, data: { id } });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }
}
