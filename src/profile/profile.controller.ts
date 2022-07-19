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
  Request,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreatBookDto } from './creat-book.dto';
import { Book } from './book.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('profile===>Crud book')
@Controller('book')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async addBook(
    @Body() bookInfo: CreatBookDto,
    @Request() req,
  ): Promise<object> {
    try {
      const result = await this.profileService.addBook(bookInfo, req.user.id);

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  async findAll(
    @Res() res: Response,
    @Request() req,
  ): Promise<Book[] | object> {
    try {
      const result = await this.profileService.findAll(req.user.id);

      if (result.length === 0) {
        return res.json({ msg: 'there is not any book...!' });
      }
      res.json({ result });
      return;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Book | object> {
    try {
      const result = await this.profileService.findOne(id, req.user.id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async updateBook(
    @Body() newInfo: CreatBookDto,
    @Param('id') id: string,
    @Request() req,
  ): Promise<object> {
    try {
      const result = await this.profileService.updateBook(
        newInfo,
        id,
        req.user.id,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Request() req): Promise<object> {
    try {
      const result = await this.profileService.deleteBook(id, req.user.id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async deleteAllBook(@Request() req): Promise<object> {
    try {
      const result = await this.profileService.deleteAllBook(req.user.id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
