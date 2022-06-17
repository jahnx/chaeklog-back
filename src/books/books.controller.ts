import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { BooksService } from './books.service';
import { User } from '../auth/user.entity';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { NoteDto } from './dto/note.dto';
import { Note } from './entity/note.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  private logger = new Logger('BooksController');
  constructor(private bookService: BooksService) {}

  //카카오 책 검색 API
  @Get('search')
  getBookByKeyword(
    @Query('keyword') keyword: string,
    @GetUser() user: User,
  ): Promise<any> {
    this.logger.verbose(`User ${user.email} trying to get all books`);
    return this.bookService.getBookByKeyword(keyword);
  }

  //모든 책 조회
  @Get()
  getAllBooks(@GetUser() user: User): Promise<Book[]> {
    this.logger.verbose(`User ${user.email} trying to get all books`);
    return this.bookService.getAllBooks(user);
  }

  //특정 아이디 책 조회
  @Get(':id')
  getBookById(@Param('id') id: number): Promise<Book> {
    this.logger.verbose(`User trying to get book with id ${id}`);
    return this.bookService.getBookById(id);
  }

  //특정 책 필사 조회
  @Get(':id/notes')
  getNotesByBookId(@Param('id') id: number): Promise<Note[]> {
    this.logger.verbose(`User trying to get notes with bookId ${id}`);
    return this.bookService.getNotesByBookId(id);
  }

  //책 기록 생성
  @Post()
  @UsePipes(ValidationPipe)
  createBook(
    @Body() bookData: CreateBookDto,
    @GetUser() user: User,
  ): Promise<Book> {
    return this.bookService.createBook(bookData, user);
  }

  //해당 책 필사 생성
  @Post(':id/notes')
  createNote(
    @Body() noteData: NoteDto,
    @Param('id') bookId: number,
  ): Promise<Note> {
    return this.bookService.createNote(noteData, bookId);
  }

  // 책 기록 날짜 수정
  @Patch(':id')
  updateReadingPeriod(
    @Param('id') id: number,
    @Body() startEndDate: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateReadingPeriod(id, startEndDate);
  }

  //필사 수정
  @Patch(':id/notes/:noteId')
  updateNote(
    @Param('noteId') id: number,
    @Body() noteData: NoteDto,
  ): Promise<Note> {
    return this.bookService.updateNote(id, noteData);
  }

  //책 기록 삭제
  @Delete(':id')
  deleteBook(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.bookService.deleteBook(id, user);
  }

  //필사 삭제
  @Delete(':id/notes/:noteId')
  deleteNote(@Param('noteId') id: number): Promise<void> {
    return this.bookService.deleteNote(id);
  }
}
