import express from 'express';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Channel } from '../models/Channel';
import { ChannelMember } from '../models/ChannelMember';

import { ChannelFindAll } from '../commands/ChannelFindAll';
import { ChannelFind } from '../commands/ChannelFind';
import { ChannelCreate } from '../commands/ChannelCreate';
import { ChannelUpdate } from '../commands/ChannelUpdate';

import { ChannelJoin } from '../commands/ChannelJoin';
import { ChannelLeave } from '../commands/ChannelLeave';

import { MessageSend } from '../commands/MessageSend';

// HACK KI ensure assocation is not dropped; fails queries if so
ChannelMember.toString();

/**
 * CRUD for Channel
 */
export class ChannelsController {
  static router = express.Router();

  static async index(req: express.Request, res: express.Response) {
    try {
      const channels = await ChannelFindAll.call(req.query);

      res.json({ data: channels });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async show(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const channel = await ChannelFind.call(id);

      res.json({ data: channel });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const channel = await ChannelCreate.call(req.body);

      await MessageSend.call(channel.id, res.locals.slacker_jwt.id, "First message...");

      res.status(201).json({ success: true, data: channel });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const channel = await ChannelUpdate.call(id, req.body);

      res.status(200).json({ success: true, data: channel });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async destroy(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      let channel = Channel.build({ id });

      await channel.destroy();

      res.status(200).json({ success: true, data: { id } });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async joinChannel(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const rs = ChannelJoin.call(id, res.locals.slacker_jwt.id);

      res.status(200).json({ success: true, data: rs });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async leaveChannel(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const rs = ChannelLeave.call(id, res.locals.slacker_jwt.id);

      res.status(200).json({ success: true, data: rs });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }
}

const router = ChannelsController.router;
router.get('/', ChannelsController.index);
router.get('/:id', ChannelsController.show);
router.post('/', ChannelsController.create);
router.put('/:id', ChannelsController.update);
router.delete('/:id', ChannelsController.destroy);
router.post('/:id/actions/join', ChannelsController.joinChannel);
router.post('/:id/actions/leave', ChannelsController.leaveChannel);
