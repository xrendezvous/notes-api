export interface ICreateNoteDto {
  title: string;
  content?: string;
}

export class CreateNoteDto implements ICreateNoteDto {
  title: string;
  content?: string;
}
