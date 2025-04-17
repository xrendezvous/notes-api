import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface IUpdateNoteDto {
  title?: string;
  content?: string;
}

export class UpdateNoteDto implements IUpdateNoteDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
