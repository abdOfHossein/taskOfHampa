import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

class LoginInfoDto {
  userName: string;
  password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username:string,password:string): Promise<any> {
    try {
      console.log(`username and password is ${username},${password}`);
      
      const user = await this.authService.validateUser(username,password);

      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
