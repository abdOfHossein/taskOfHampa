import { Body, Controller, Get, Post, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUserDto';
import { User } from './user.entity';
import { Response } from 'express';

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}
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
interface IUsers {
  data: Array<IUserInfo>;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async findAll(@Res() res: Response): Promise<User[] | object> {
    try {
      const result = await this.userService.findAll();
      if (result.length === 0) {
        return res.status(200).json({ msg: 'there is not any user...!' });
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  //   async findOne(id: string): Promise<IUserInfo | object> {
  //     try {
  //       console.log(`param in postqrSql service is===>${id}`);
  //       console.log(id['id']);
  //       const result = await this.userService.findOne(id['id']);
  //       console.log(result);

  //       return result;
  //     } catch (error) {
  //       console.log(`err of findOne in api-gateway controller:${error}`);
  //     }
  //   }

  //   async addUser(userInfo: CreatUserDto): Promise<object> {
  //     try {
  //       console.log(`userInfo addUser postqrSql:${userInfo}`);

  //       return this.userService.addUser(userInfo);
  //     } catch (error) {
  //       console.log(`err of findOne in api-gateway controller:${error}`);
  //     }
  //   }

  //   async updateUser(reqBodyUpdateUSer: IReqBodyUpdateUSer): Promise<object> {
  //     try {
  //       console.log(reqBodyUpdateUSer);
  //       console.log(JSON.stringify(reqBodyUpdateUSer));

  //       return this.userService.updateUser(reqBodyUpdateUSer);
  //     } catch (error) {
  //       console.log(`err of findOne in api-gateway controller:${error}`);
  //     }
  //   }

  //   async deleteUser(id: number): Promise<object> {
  //     try {
  //       return this.userService.deleteUser(id);
  //     } catch (error) {
  //       console.log(
  //         `err of deleteUser in controller in postgrSqlService:${error}`,
  //       );
  //     }
  //   }
}
