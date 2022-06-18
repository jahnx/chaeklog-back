import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.notes, {
    eager: false,
    onDelete: 'CASCADE',
  })
  book: Book;

  @Column()
  page: number;

  @Column()
  sentence: string;
}
