import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: CreatBookDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
