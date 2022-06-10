import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './repository/book.repository';
import { AuthModule } from '../auth/auth.module';
import { NoteRepository } from './repository/note.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository, NoteRepository]),
    AuthModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
