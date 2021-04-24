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
    const payload = await this.instance().verify(token);

    console.log("jwt: " + token);
    console.log(payload);

    return payload;
  }

  static instance(): JWTVerifier {
    if (!this._instance) {
      this._instance = new JWTVerifier();
    }
    return this._instance;
  }
}