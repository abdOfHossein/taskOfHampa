import { Injectable } from '@nestjs/common';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user/createUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userInfo: CreateUserDto) {
    try {
      const isExistEmail = await this.userRepository.findOne({
        where: { userName: userInfo.userName },
      });

      if (isExistEmail) {
        return { error: 'this userName already existed' };
      }

      const user = await this.userRepository.save(userInfo);

      if (user) {
        const payload = { userName: user.userName, sub: user.id };
        return {
          msg: 'user created successfully',
          access_token: this.jwtService.sign(payload),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async login(loginInfo: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { userName: loginInfo.userName },
    });

    if (user && user.password === loginInfo.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
