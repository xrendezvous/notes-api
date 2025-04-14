import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface ICreateNoteDto {
  title: string;
  content?: string;
}

export class CreateNoteDto implements ICreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;
}
