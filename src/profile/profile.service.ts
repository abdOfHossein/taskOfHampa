import { Injectable } from '@nestjs/common';
import { CreatBookDto } from './creat-book.dto';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private userService: UserService,
  ) {}

  async addBook(bookInfo: CreatBookDto, id: string) {
    try {
      const user: any = await this.userService.findOne(id);
      const book = this.bookRepository.create(bookInfo);
      book.user = user;
      await this.bookRepository.save(book);
      if (book) {
        return { msg: 'book created successfully' };
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(user_id: number) {
    try {
      const books = await this.bookRepository.find({ where: { user_id } });
      return books;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, user_id: number) {
    try {
      const Id = Number(id);
      const book = await this.bookRepository.findOneBy({ id: Id });
      if (!book) {
        return { msg: 'book with this id does not found' };
      }
      if (book.user_id != user_id) {
        return { msg: 'access denied' };
      }
      return book;
    } catch (error) {
      throw error;
    }
  }

  async updateBook(newInfo: CreatBookDto, id: string, user_id: number) {
    try {
      const Id = Number(id);
      const book = await this.bookRepository.findOne({ where: { id: Id } });
      if (book.user_id !== user_id) {
        return { msg: 'access denied' };
      }
      const updatedBook = await this.bookRepository.update(id, newInfo);

      if (updatedBook.affected == 0) {
        return { msg: 'something is wrong!!! we can not update book...' };
      }
      return { msg: 'book updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(id: string, user_id: number) {
    try {
      const Id = Number(id);
      const book = await this.bookRepository.findOne({ where: { id: Id } });
      if (book.user_id !== user_id) {
        return { msg: 'access denied' };
      }
      const result = await this.bookRepository.delete(id);
      if (result.affected == 0) {
        return { msg: 'something is wrong!!! book does not deleted...' };
      }
      return { msg: 'book deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async deleteAllBook(user_id: number) {
    try {
      const result = await this.bookRepository.delete({ user_id });
      if (result.affected == 0) {
        return { msg: 'something is wrong!!! book does not deleted...' };
      }
      return { msg: 'all books deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
