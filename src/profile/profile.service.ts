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
        return { msg: 'book created successfully' };
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

  async findOne(id: string) {
    try {
      const Id = Number(id);
      const book = await this.bookRepository.findOneBy({ id: Id });
      if (!book) {
        return { msg: 'book with this id does not found' };
      }
      return book;
    } catch (error) {
      throw error;
    }
  }

 
  async updateBook(newInfo: CreatBookDto, id: string) {
    try {
      const Id = Number(id);
      const updatedUser = await this.bookRepository.update(id, newInfo);
      if (updatedUser.affected == 0) {
        return { msg: 'something is wrong!!! we can not update book...' };
      }
      return { msg: 'book updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  
  async deleteBook(id: string) {
    try {
      const result = await this.bookRepository.delete(id);
      if (result.affected == 0) {
        return { msg: 'something is wrong!!! book does not deleted...' };
      }
      return { msg: 'book deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
