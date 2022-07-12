import { Controller, Get, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsUtils, Repository } from 'typeorm';

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

  async findAll() {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {

      throw  error
    }
  }

//   async findOne(id: number) {
//     try {
//       const user = await this.userRepository.findOneBy({ id });
//       console.log(user);

//       if (!user) {
//         return { msg: 'id is wrong !!!' };
//       }
//       return user;
//     } catch (error) {
//       console.log(`err of findOne in service-a:${error}`);
//     }
//   }

//   async addUser(userInfo: IUserInfo) {
//     try {
//       console.log(JSON.stringify(userInfo));

//       const user = await this.userRepository.save(userInfo);
//       console.log(user);
//       console.log(JSON.stringify(user));

//       return { msg: 'user created successfully' };
//     } catch (error) {
//       console.log(`err of addUser in service-a`);
//     }
//   }

//   //update user
//   async updateUser(reqBodyUpdateUSer: IReqBodyUpdateUSer) {
//     try {
//       console.log(
//         `reqBodyUpdateUSer.id,,,reqBodyUpdateUSer.info===>${
//           reqBodyUpdateUSer.id
//         },${JSON.stringify(reqBodyUpdateUSer.info)}`,
//       );

//       const updatedUser = await this.userRepository.update(
//         reqBodyUpdateUSer.id,
//         reqBodyUpdateUSer.info,
//       );
//       console.log(updatedUser);
//       console.log(JSON.stringify(updatedUser));
//       if (updatedUser.affected == 0) {
//         return { msg: 'something is wrong!!! we can not update user...' };
//       }
//       return { msg: 'user updated successfully' };
//     } catch (error) {
//       console.log(
//         `err of updateUser user-service in postgrSqlService:${error}`,
//       );
//       return {
//         error: `can not update user===>${error}`,
//       };
//     }
//   }
//   //delete user
//   async deleteUser(id: number) {
//     try {
//       const result = await this.userRepository.delete(id);
//       console.log(result);

//       console.log(JSON.stringify(result));
//       if (result.affected == 0) {
//         return { msg: 'error user does not deleted' };
//       }
//       return { msg: 'user deleted successfully' };
//     } catch (error) {
//       console.log(
//         `err of deleteUser user-service in postgrSqlService:${error}`,
//       );
//       return {
//         error: `can not delete user===>${error}`,
//       };
//     }
//   }
}
