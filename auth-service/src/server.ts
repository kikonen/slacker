import express from 'express';

const { generators } = require('openid-client');

import fs from 'fs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import querystring from 'querystring';
import fetch from 'node-fetch';

import { GoogleAuth } from './GoogleAuth';

import { URLSearchParams } from 'url';

dotenv.config();

const app = express();

const port = parseInt(process.env.SERVER_PORT || '3200', 10);

app.use(GoogleAuth.initialize);
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/login', async (req, res) => {
  const response = await fetch('http://api:3100/roles');
  const roles = await response.json();

  console.log(roles);

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

  res.render(`${__dirname}/../view/index`, { roles: roles.data, auth_url: auth_url });
});

app.get('/callback', async (req, res) => {
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

    let user;
    {
      const userParams = new URLSearchParams();
      userParams.append('email', userInfo.email);
      userParams.append('name', userInfo.name);

      let response = await fetch('http://api:3100/users', { method: 'POST', body: userParams });
      user = await response.json();
    }

    let token;
    {
      let payload = {
        id: user.id as string,
        email: user.email as string,
      };

      let privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
      console.log(privateKey);
      let token = jwt.sign(payload, privateKey)
      let decodedToken = jwt.decode(token)
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

    res.send(`Authenticated...<br>${JSON.stringify(user)}`);
  } catch(error) {
    console.log(error);
    res.status(500).json({ "success": false, error: error });
  }
});

app.listen(port, 'auth', () => {
  console.log(`Listening at http://localhost:${port}`);
});
