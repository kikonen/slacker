import express from 'express';

import { JWTVerifier } from '../JWTVerifier';

import { DB } from '../DB';
import { User, USER_SECRETS } from '../models/User'
import { Role } from '../models/Role';

/**
 * CRUD for Role
 */
export class RolesController {
  static router = express.Router();

  static async index(req: express.Request, res: express.Response) {
    try {
      const payload = await JWTVerifier.verifyToken(req);

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
      const payload = await JWTVerifier.verifyToken(req);

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

const router = RolesController.router;
router.get('/', RolesController.index);
router.get('/:id', RolesController.show);
