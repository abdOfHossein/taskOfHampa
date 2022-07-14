import { Injectable } from '@nestjs/common';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user/createUserDto';


class LoginInfoDto {
  userName: string;
  password: string;
}

@Injectable() 
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

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
        return {
          msg: 'user created successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // async login(loginInfo: LoginInfoDto): Promise<any> {
  //   try {
  //     const user = await this.userRepository.findOne({
  //       where: { userName: loginInfo.userName },
  //     });

  //     if (user && user.password === loginInfo.password) {
  //       const payload = { userName: user.userName, sub: user.password };

  //       return {
  //         access_token: this.jwtService.sign(payload),
  //       };
  //     }

  //     return { msg: 'userName or password is wrong!!!' };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async validateUser(userName: string, pass: string): Promise<any> {
  //   try {
  //     const user = await this.userRepository.findOne({
  //       where: { userName },
  //     });

  //     if (user && user.password === pass) {
  //       return user;
  //     }
  //     return null;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
