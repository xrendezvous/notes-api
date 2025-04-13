export interface IUpdateNoteDto {
  title?: string;
  content?: string;
}

export class UpdateNoteDto implements IUpdateNoteDto {
  title?: string;
  content?: string;
}
