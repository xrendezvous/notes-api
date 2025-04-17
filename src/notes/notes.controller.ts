import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteDto, NoteListDto } from './dto/note.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<NoteDto> {
    const note = await this.notesService.createNote(createNoteDto);
    return new NoteDto(note);
  }

  @Get()
  async findAll(): Promise<NoteListDto> {
    const result = await this.notesService.getAllNotes();
    const dtoItems = result.items.map((n) => new NoteDto(n));
    return new NoteListDto(dtoItems);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<NoteDto> {
    const note = await this.notesService.findNote(id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return new NoteDto(note);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<NoteDto> {
    const note = await this.notesService.updateNote(id, updateNoteDto);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return new NoteDto(note);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<{ success: boolean }> {
    const success = await this.notesService.removeNote(id);
    return { success };
  }
}
