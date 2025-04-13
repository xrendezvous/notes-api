import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}

  async createNote(createDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepo.create(createDto);
    return this.noteRepo.save(note);
  }

  async getAllNotes(): Promise<{ items: Note[] }> {
    const items = await this.noteRepo.find();
    return { items };
  }

  async findNote(id: string): Promise<Note> {
    const note = await this.noteRepo.findOneBy({ id });
    if (!note) throw new NotFoundException('Note not found');
    return new NoteDto(note);
  }

  async updateNote(id: string, updateDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findNote(id);
    const updated = this.noteRepo.merge(note, updateDto);
    return this.noteRepo.save(updated);
  }

  async removeNote(id: string): Promise<{ success: boolean }> {
    const res = await this.noteRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Note not found');
    return { success: true };
  }
}
