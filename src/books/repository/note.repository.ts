import { EntityRepository, Repository } from 'typeorm';
import { Note } from '../entity/note.entity';
import { NoteDto } from '../dto/note.dto';
import { Book } from '../entity/book.entity';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  async createNote(noteData: NoteDto, book: Book): Promise<Note> {
    const { page, sentence } = noteData;
    const note = this.create({
      page,
      sentence,
      book,
    });

    await this.save(note);

    return note;
  }
}
