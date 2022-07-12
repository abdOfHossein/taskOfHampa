import { Controller, Get, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsUtils, Repository } from 'typeorm';
import { CreateUserDto } from './createUserDto';

interface IUserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: number;
}
interface IId {
  id: number;
}

interface IReqBodyUpdateUSer {
  id: number;
  info: IUserInfo;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //creat user
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

  //read all user
  async findAll() {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {
      throw error;
    }
  }

  //read one user
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

  //update user
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

  //delete user
  async deleteUser(id: string) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected == 0) {
        return { msg: 'something is wrong!!! user does not deleted...' };
      }
      return { msg: 'user deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
