import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'xrendezvous',
      password: 'Xzvv9843',
      database: 'notes-editor-db',
      entities: [Note],
      synchronize: true,
    }),
    NotesModule,
  ],
})
export class AppModule {}
