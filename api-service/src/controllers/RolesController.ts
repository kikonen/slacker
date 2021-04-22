import express from 'express';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';

/**
 * CRUD for Role
 */
export class RolesController {
  static async index(req: express.Request, res: express.Response) {
    try {
      const roles = await Role.findAll({
        include: {
          model: User,
          as: 'users',
          attributes: { exclude: USER_SECRETS },
        }
      });

      res.json({ data: roles });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async show(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(
        id,
        {
          include: {
            model: User,
            as: 'users',
            attributes: { exclude: USER_SECRETS },
          }
        });

      res.json({ data: role });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }
}
