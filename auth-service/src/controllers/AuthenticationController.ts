import express from 'express';
const { generators } = require('openid-client');

import fs from 'fs';
import jwt from 'jsonwebtoken';

import path from 'path';
import querystring from 'querystring';
import fetch from 'node-fetch';

import { URLSearchParams } from 'url';

import { GoogleAuth } from '../GoogleAuth';

let systemToken: string;

function getSystemToken(): string {
  if (!systemToken) {
    const PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
    let payload = {
      id: 'SYSTEM',
      email: 'system@system',
      system: true,
    };
    systemToken = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS512' });
    console.log(`SERVER_TOKEN: ${systemToken}`);
  }
  return systemToken;
}

export class AuthenticationController {
  static async login(req: express.Request, res: express.Response) {
    try {
      const code_verifier = generators.codeVerifier();
      const state = generators.codeChallenge(code_verifier);

      const auth_url = GoogleAuth.client.authorizationUrl({
        scope: "openid email profile",
        state,
      });

      res.cookie("_slacker_auth_state", state, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.PRODUCTION === 'true',
      });

      res.redirect(302, auth_url);
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }

  static async logout(req: express.Request, res: express.Response) {
    try {
      res.clearCookie("_slacker_auth");
      res.redirect(302, "../ui");
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }

  static async callback(req: express.Request, res: express.Response) {
    try {
      let userInfo;
      {
        const client = GoogleAuth.client;

        const state: string = req.cookies._slacker_auth_state;
        console.log("auth_state: " + state);

        const params = client.callbackParams(req);

        const tokenSet = await client.callback(
          `${GoogleAuth.getDomain(req)}/auth/callback`,
          params,
          { state });
        userInfo = await client.userinfo(tokenSet);

        console.log("USER_INFO");
        console.log(userInfo);
      }

      const systemFetchHeaders = {
        Authorization: `Bearer ${getSystemToken()}`
      }

      let user;
      {
        console.log("FINDING USER...");
        const userParams = new URLSearchParams();
        userParams.append('email', userInfo.email);

        var query = querystring.stringify({email: userInfo.email});

        let response = await fetch(`http://api:3100/users/action/find_email?${query}`,
                                   { headers: systemFetchHeaders } );

        let parsed = await response.json();
        user = parsed.data;

        console.log("VIA EMAIL:");
        console.log(user);
      }

      if (!user) {
        console.log("CREATING USER...");
        const userParams = new URLSearchParams();
        userParams.append('email', userInfo.email);
        userParams.append('name', userInfo.name);

        let response = await fetch('http://api:3100/users',
                                   { headers: systemFetchHeaders, method: 'POST', body: userParams });

        let parsed = await response.json();
        console.log(parsed);
        user = parsed.data;

        console.log("VIA NEW USER:");
        console.log(user);
      }

      let token;
      {
        let payload = {
          id: user.id as string,
          email: user.email as string,
        };

        const PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
        const PUBLIC_KEY = fs.readFileSync(process.env.JWT_PUBLIC_KEY);

        console.log(PRIVATE_KEY);
        console.log(PUBLIC_KEY);

        token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS512' });
        let decodedToken = jwt.decode(token);

        console.log("jwt: " + token);
        console.log(decodedToken);
      }

      // NOTE KI Typescript does NOT allow 0 to create session cookie
      res.cookie("_slacker_auth", token, {
        httpOnly: true,
        expires:  new Date((new Date()).getTime() + 1 * 60 * 60 * 1000),
        sameSite: 'lax',
        secure: process.env.PRODUCTION === 'true',
      });

//      res.send(`Authenticated...<br>${JSON.stringify(user)}`);
      res.redirect(302, "../ui");
    } catch(error) {
      console.log(error);
      res.status(500).json({ "success": false, error: error });
    }
  }
}
