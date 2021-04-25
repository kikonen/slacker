import express from 'express';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';

import { RoleFindAll } from '../commands/RoleFindAll';
import { RoleFind } from '../commands/RoleFind';

/**
 * CRUD for Role
 */
export class RolesController {
  static router = express.Router();

  static async index(req: express.Request, res: express.Response) {
    try {
      const roles = await RoleFindAll.call(req.query);

      res.json({ data: roles });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }

  static async show(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const role = await RoleFind.call(id);

      res.json({ data: role });
    } catch(error) {
      res.status(404).json({ success: false, error: error });
    }
  }
}

const router = RolesController.router;
router.get('/', RolesController.index);
router.get('/:id', RolesController.show);
