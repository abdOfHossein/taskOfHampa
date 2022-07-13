import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constant';

const config = require('dotenv').config(join(__dirname, '../.env'));
const port = Number(process.env.DB_PORT);
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

@Module({
  imports: [
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
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
