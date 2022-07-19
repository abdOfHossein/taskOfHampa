import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateUserDto } from './user/createUserDto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginInfoDto } from './loginInfo.dto';
import { AuthGuard } from '@nestjs/passport';

console.log('hello');

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req,@Body() userInfo: LoginInfoDto): Promise<object> {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw error;
    }
  }
}
