import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      isGithubActions
        ? {
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [Note],
            synchronize: true,
          }
        : {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'xrendezvous',
            password: 'Xzvv9843',
            database: 'notes-editor-db',
            entities: [Note],
            synchronize: true,
          },
    ),
    NotesModule,
  ],
})
export class AppModule {}
