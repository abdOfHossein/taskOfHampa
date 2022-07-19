import { Injectable } from '@nestjs/common';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user/createUserDto';

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
}
