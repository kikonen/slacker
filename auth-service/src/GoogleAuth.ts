import express from 'express';
import { Issuer } from 'openid-client';

/**
 * @see https://nosleepjavascript.com/openid-oauth-authentication-for-nodejs/
 */
export class GoogleAuth {
  static issuer: any;
  static client: any;
  static initialize: (req: express.Request, res: express.Response, next: express.NextFunction) => void;

  static getDomain(req: express.Request): string {
    let proto = req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'http';
    let host = req.headers['x-forwarded-host'] ? req.headers['x-forwarded-host'] : process.env.HOST;
    let port = req.headers['x-forwarded-port'] ? req.headers['x-forwarded-port'] : process.env.PORT;

    let url = port ? `${proto}://${host}:${port}` : `${proto}://${host}`;
    return url;
  }

  static getBaseUrl(req: express.Request): string {
    return process.env.BASE_URL;
  }
}

async function initialize(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (GoogleAuth.issuer) {
    return next();
  }

  console.log(req.headers);

  const googleIssuer = await Issuer.discover(
    "https://accounts.google.com"
  );

  const client = new googleIssuer.Client({
    client_id: process.env.OAUTH_CLIENT_ID!,
    client_secret: process.env.OAUTH_CLIENT_SECRET!,
    redirect_uris: [`${GoogleAuth.getBaseUrl(req)}/auth/callback`],
    response_types: ["code"],
  });

  GoogleAuth.issuer = googleIssuer;
  GoogleAuth.client = client;

  next();
}

GoogleAuth.initialize = initialize;
