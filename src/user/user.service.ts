import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './createUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addUser(userInfo: CreateUserDto) {
    try {
      const user = await this.userRepository.save(userInfo);
      if (user) {
        return { msg: 'user created successfully' };
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({ relations: ['books'] });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const Id = Number(id);
      const user = await this.userRepository.findOneBy({ id: Id });
      if (!user) {
        return { msg: 'user with this id does not found' };
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(newInfo: CreateUserDto, id: string) {
    try {
      const Id = Number(id);
      const updatedUser = await this.userRepository.update(id, newInfo);
      if (updatedUser.affected == 0) {
        return { msg: 'something is wrong!!! we can not update user...' };
      }
      return { msg: 'user updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const delUser: any = await this.userRepository.delete(id);

      if (delUser.affected == 0) {
        return {
          msg: 'something is wrong!!! user does not deleted...',
        };
      }
      return { msg: 'user and his books deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async deleteAllUser() {
    try {
      const delAllUsers: any = await this.userRepository.delete({});
      if (delAllUsers.affected == 0) {
        return { msg: 'something is wrong!!! user does not deleted...' };
      }

      return { msg: 'all user deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
