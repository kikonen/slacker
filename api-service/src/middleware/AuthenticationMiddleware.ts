import express from 'express';

import { JWTVerifier } from '../JWTVerifier';


/**
 * Ensure session has valid JWT token
 */
export class AuthenticationMiddleware {
  static async process(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const jwt = await JWTVerifier.verifyToken(req);
      res.locals.slacker_jwt = jwt;

      console.log("AUTH", jwt);

      next();
    } catch(error) {
      console.log(error);
      res.status(401).json({ "success": false, error: error });
    }
  }
}
