import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateUserDto } from './user/createUserDto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('loginAndRegisterUser')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('register')
  async register(@Body() userInfo: CreateUserDto): Promise<object> {
    try {
      const result = await this.appService.register(userInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() loginInfo: any): Promise<object> {
    try {
      const result = await this.appService.login(loginInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
