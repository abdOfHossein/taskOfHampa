import { Injectable } from '@nestjs/common';
import { CreatBookDto } from './creat-book.dto';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async addBook(bookInfo: CreatBookDto) {
    try {
      const user = await this.bookRepository.save(bookInfo);
      if (user) {
        return { msg: 'user created successfully' };
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.bookRepository.find({});
      return users;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: CreatBookDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
