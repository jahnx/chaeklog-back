import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './repository/book.repository';
import { User } from '../auth/user.entity';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { NoteRepository } from './repository/note.repository';
import { Note } from './entity/note.entity';
import { NoteDto } from './dto/note.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import KakaoAPI from './kakaoSearchAPI';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    @InjectRepository(NoteRepository)
    private bookRepository: BookRepository,
    private noteRepository: NoteRepository,
  ) {}

  //모든 책 조회
  async getAllBooks(user: User): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder('book');
    query.where('book.userId = :userId', { userId: user.id });

    const books = await query.getMany();
    return books;
  }

  //특정 책 한권 조회
  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new NotFoundException(`Can't find book with id ${id}`);
    }
    return book;
  }

  //책 기록
  async createBook(bookData: CreateBookDto, user: User): Promise<Book> {
    return this.bookRepository.createBook(bookData, user);
  }

  //필사 생성
  async createNote(noteData: NoteDto, bookId: number): Promise<Note> {
    const book = await this.getBookById(bookId);
    return this.noteRepository.createNote(noteData, book);
  }

  //책 기록 날짜 수정
  async updateReadingPeriod(
    id: number,
    startEndDate: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.getBookById(id);

    book.startDate = startEndDate.startDate;
    book.endDate = startEndDate.endDate;

    await this.bookRepository.save(book);

    return book;
  }

  //필사 수정
  async updateNote(id: number, noteData: NoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    note.page = noteData.page;
    note.sentence = noteData.sentence;

    await this.noteRepository.save(note);
    return note;
  }

  //책 기록 삭제
  async deleteBook(id: number, user: User): Promise<void> {
    const result = await this.bookRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Book with id ${id}`);
    }
    console.log('result: ', result);
  }

  //필사 삭제
  async deleteNote(id: number): Promise<void> {
    const result = await this.noteRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Note with id ${id}`);
    }
    console.log('result: ', result);
  }
}
