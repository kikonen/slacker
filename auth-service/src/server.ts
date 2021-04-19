import express from 'express';

import { Pool, PoolClient, Client } from 'pg';
const { generators } = require('openid-client');

import fs from 'fs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import querystring from 'querystring';

import { GoogleAuth } from './GoogleAuth';

dotenv.config();

const app = express();

const port = parseInt(process.env.SERVER_PORT || '3200', 10);

const pool = new Pool({
  max: 5,
});

app.use(GoogleAuth.initialize);
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
  let client:PoolClient = null;

  pool.connect()
    .then(c => {
      client = c;
      return client.query('SELECT id, name from roles');
    }).then( (rs) => {
      client.release();
      return rs;
    }).then(rs => {
      const roles = rs.rows;

      const code_verifier = generators.codeVerifier();
      const code_challenge = generators.codeChallenge(code_verifier);

      const auth_url = GoogleAuth.client.authorizationUrl({
        scope: "openid email profile",
        code_challenge,
      });

      res.render(`${__dirname}/../view/index`, { roles: roles, auth_url: auth_url });
    });
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  const scope = req.query.scope;
  const authuser = req.query.authuser;
  const prompt = req.query.prompt;
  let salt = 'random';

  let payload = {
    code: code,
    scope: scope,
    authuser: authuser,
    salt: salt,
  };

  let privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
  console.log(privateKey);
  let token = jwt.sign(payload, privateKey)
  let decodedToken = jwt.decode(token)
  console.log("jwt: " + token);
  console.log(decodedToken);

  // NOTE KI Typescript does NOT allow 0 to create session cookie
  res.cookie("_slacker_auth", token, {
    httpOnly: true,
    expires:  new Date((new Date()).getTime() + 1 * 60 * 60 * 1000),
    sameSite: 'lax',
    secure: process.env.PRODUCTION === 'true',
  });

  res.send(
`Authenticated...
<br>code = ${code}
<br>scope = ${scope}
<br>authuser = ${authuser}
<br>prompt = ${prompt}
`);

});

app.listen(port, 'auth', () => {
  console.log(`Listening at http://localhost:${port}`);
});
