// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from './auth.service';



// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   async validate(userName: string, password: string): Promise<any> {
//     try {
//       const user = await this.authService.validateUser(userName, password);
//       console.log(user);

//       if (!user) {
//         throw new UnauthorizedException();
//       }

//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

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
      const contextId = ContextIdFactory.getByRequest(request);
      const authService = await this.moduleRef.resolve(AuthService, contextId);
      const user = await authService.validateUser(username, password);
      console.log(user);

      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
