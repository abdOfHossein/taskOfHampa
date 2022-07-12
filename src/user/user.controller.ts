import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUserDto';
import { User } from './user.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //creat user
  @Post()
  async addUser(@Body() userInfo: CreateUserDto): Promise<object> {
    try {
      const result = await this.userService.addUser(userInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }

  //readl all user
  @Get('all')
  async findAll(@Res() res: Response): Promise<User[] | object> {
    try {
      console.log('hello');

      const result = await this.userService.findAll();
      console.log(result);

      if (result.length === 0) {
        return res.status(200).json({ msg: 'there is not any user...!' });
      }
      res.json(result);
      return;
    } catch (error) {
      throw error;
    }
  }

  //read one user
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | object> {
    try {
      const result = await this.userService.findOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  //update user
  @Put(':id')
  async updateUser(
    @Body() newInfo: CreateUserDto,
    @Param('id') id: string,
  ): Promise<object> {
    try {
      const result = await this.userService.updateUser(newInfo, id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  //delete user
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<object> {
    try {
      const result = await this.userService.deleteUser(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
