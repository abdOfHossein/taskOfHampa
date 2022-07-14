import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { join } from 'path';

const config = require('dotenv').config(join(__dirname, '../../.env'));
const secret = process.env.JWT_SECRET_KEY;
console.log(secret);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    return {
      userName: payload.userName,
      password: payload.sub,
    };
  }
}
