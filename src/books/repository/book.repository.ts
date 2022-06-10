import { EntityRepository, Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { User } from '../../auth/user.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(bookData: CreateBookDto, user: User): Promise<Book> {
    const { title, author, imgURL, startDate, endDate } = bookData;
    const book = this.create({
      title,
      author,
      imgURL,
      startDate,
      endDate,
      user,
    });

    await this.save(book);

    return book;
  }
}
