import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt,Strategy } from 'passport-jwt';
import { join } from 'path';

const config = require('dotenv').config(join(__dirname, '../../.env'));
const secret = process.env.JWT_SECRET_KEY;
console.log(secret);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    })
  }

  async validate(payload: any) {
    return {
      userName: payload.userName,
      password: payload.sub,
    };
  }
}
