export interface INoteDto {
  id: string;
  title: string;
  content: string;
}

export class NoteDto implements INoteDto {
  id: string;
  title: string;
  content: string;

  constructor(partial: Partial<NoteDto>) {
    Object.assign(this, partial);
  }
}

export interface INoteListDto {
  items: INoteDto[];
}

export class NoteListDto implements INoteListDto {
  items: NoteDto[];

  constructor(items: NoteDto[]) {
    this.items = items;
  }
}

