import express from 'express';

import path from 'path';
import querystring from 'querystring';

import { URLSearchParams } from 'url';

import { Kafka } from '../Kafka';
import { DB } from '../DB';

import { ChannelJoin } from '../commands/ChannelJoin';
import { MessageSend } from '../commands/MessageSend';

const commands = new Map([
  ['/join', ChannelJoin]
]);

export class CommandsController {
  static router = express.Router();

  static async send(req: express.Request, res: express.Response) {
    try {
      console.log("BODY", req.body);
      let { text, channel_id } = req.body;

      let handler: any;
      let commandText: string;

      text = text.trim();
      if (text[0] == '/') {
        let command: string = text.split(' ')[0];
        handler = commands.get(command) as any;
        commandText = text.substring(command.length, text.length).trim();
      } else {
        handler = MessageSend;
        commandText = text;
      }

      await handler.handle(req, res, channel_id, commandText);

      res.send({"success": true});
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }
}

const router = CommandsController.router;
router.post('/send', CommandsController.send);
