import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteDto, NoteListDto } from './dto/note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): NoteDto {
    const note = this.notesService.create(createNoteDto);
    return new NoteDto(note);
  }

  @Get()
  findAll(): NoteListDto {
    const result = this.notesService.findAll();
    const dtoItems = result.items.map((n) => new NoteDto(n));
    return new NoteListDto(dtoItems);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NoteDto> {
    const note = await this.notesService.findOne(id);
    return new NoteDto(note);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<NoteDto> {
    const note = await this.notesService.update(id, updateNoteDto);
    return new NoteDto(note);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { success: boolean } {
    return this.notesService.remove(id);
  }
}
