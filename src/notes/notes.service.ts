import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotesService {
  private notes: Note[] = [];

  create(createNoteDto: CreateNoteDto): Note {
    const note: Note = {
      id: uuidv4(),
      title: createNoteDto.title,
      content: createNoteDto.content || '',
    };
    this.notes.push(note);
    return note;
  }

  findAll(): { items: Note[] } {
    return { items: this.notes };
  }

  findOne(id: string): Note {
    const note = this.notes.find(n => n.id === id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  update(id: string, updateDto: UpdateNoteDto): Note {
    const note = this.findOne(id);
    note.title = updateDto.title ?? note.title;
    note.content = updateDto.content ?? note.content;
    return note;
  }

  remove(id: string): { success: boolean } {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) throw new NotFoundException('Note not found');
    this.notes.splice(index, 1);
    return { success: true };
  }
}
