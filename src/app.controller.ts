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
import { ApiTags, ApiBearerAuth, ApiProperty, ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateUserDto } from './user/createUserDto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import{LoginInfoDto} from './loginInfo.dto'



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
  async login(@Body() userInfo: LoginInfoDto, @Request() req): Promise<object> {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw error;
    }
  }
}
