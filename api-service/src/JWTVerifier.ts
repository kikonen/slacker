import express from 'express';
import fs from 'fs';

import { createDecoder, createVerifier } from 'fast-jwt';


export class JWTVerifier {
  private static _instance: JWTVerifier = null;

  publicKey: Buffer;

  decode: any;
  verify: any;

  constructor() {
    this.publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY);

    this.decode = createDecoder();
    this.verify = createVerifier({
      algorithms: ['RS512'],
      key: this.publicKey,
      cache: 1000,
    });
  }

  static async verifyToken(req: express.Request) {
    let token: string = req.cookies._slacker_auth;
    if (!token) {
      let header = req.headers['authorization'] as string;
      if (header) {
        token = header.split(/\s+/).pop() || '';
      }
    }

    const jwt = token != null ? await this.instance().verify(token) : null;

    //console.log("jwt: " + token);
    //console.log(jwt);

    return jwt;
  }

  static instance(): JWTVerifier {
    if (!this._instance) {
      this._instance = new JWTVerifier();
    }
    return this._instance;
  }
}
