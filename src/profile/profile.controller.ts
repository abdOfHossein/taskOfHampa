import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreatBookDto } from './creat-book.dto';
import { Book } from './book.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('profile===>Crud book')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async addBook(@Body() bookInfo: CreatBookDto): Promise<object> {
    try {
      const result = await this.profileService.addBook(bookInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  async findAll(@Res() res: Response): Promise<Book[] | object> {
    try {
      const result = await this.profileService.findAll();
      console.log(result);

      if (result.length === 0) {
        return res.json({ msg: 'there is not any user...!' });
      }
      res.json({ result });
      return;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | object> {
    try {
      const result = await this.profileService.findOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  }


  @Put(':id')
  async updateBook(
    @Body() newInfo: CreatBookDto,
    @Param('id') id: string,
  ): Promise<object> {
    try {
      const result = await this.profileService.updateBook(newInfo, id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<object> {
    try {
      const result = await this.profileService.deleteBook(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
