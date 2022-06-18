import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { Note } from './note.entity';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  authors: string;

  @Column()
  thumbnail: string;

  @Column()
  startDate: string;

  @Column({ nullable: true, default: null })
  endDate: string;

  @OneToMany(() => Note, (note) => note.book, { eager: true })
  notes: Note[];

  @ManyToOne(() => User, (user) => user.books, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
