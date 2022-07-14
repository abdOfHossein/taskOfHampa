import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';

class LoginInfoDto {
  userName: string;
  password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({ passReqToCallback: true });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    try {

      console.log('i had something here....');
      
      const contextId = ContextIdFactory.getByRequest(request);
      const authService = await this.moduleRef.resolve(AuthService, contextId);

      console.log(`username and password is ${username},${password}`);

      const user = await authService.validateUser(username, password);

      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
