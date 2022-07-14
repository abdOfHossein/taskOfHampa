import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateUserDto } from './user/createUserDto';

import { AuthGuard } from '@nestjs/passport';
import { User } from './user/user.entity';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { userInfo } from 'os';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

class LoginInfoDto {
  userName: string;
  password: string;
}

@ApiTags('loginAndRegisterUser')
@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userInfo: CreateUserDto): Promise<object> {
    try {
      const result = await this.appService.register(userInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userInfo: LoginInfoDto, @Request() req): Promise<object> {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Request() req: any) {
    return req.user;
  }
}
