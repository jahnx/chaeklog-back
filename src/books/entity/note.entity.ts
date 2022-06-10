import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.notes, { eager: false })
  book: Book;

  // @RelationId((note: Note) => note.book)
  // bookId: number;

  @Column()
  page: number;

  @Column()
  sentence: string;
}
