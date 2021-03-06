import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user: any = await this.userRepository.findOne({
        where: { userName: username },
      });

      if (user && user.password == password) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
