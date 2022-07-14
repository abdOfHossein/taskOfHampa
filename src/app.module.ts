import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './profile/profile.module';

const config = require('dotenv').config(join(__dirname, '../.env'));
const port = Number(process.env.DB_PORT);
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const secret = process.env.JWT_SECRET_KEY;

@Module({
  imports: [
    AuthModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port,
      username,
      password,
      database: 'user&task',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    ProfileModule,

  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
