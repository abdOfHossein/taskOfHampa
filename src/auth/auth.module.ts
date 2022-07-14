import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { JwtStrategy } from './jwt.strategy';

const config = require('dotenv').config(join(__dirname, '../../.env'));
const secret = process.env.JWT_SECRET_KEY;
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
    UserModule
  ],
  providers: [JwtStrategy,AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}