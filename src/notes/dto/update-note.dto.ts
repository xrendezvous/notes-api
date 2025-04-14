import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface IUpdateNoteDto {
  title: string;
  content?: string;
}

export class UpdateNoteDto implements IUpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;
}
