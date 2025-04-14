import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from '../src/notes/notes.module';
import { Note } from '../src/notes/entities/note.entity';

describe('NotesController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  it('POST /notes - створення нотатки', async () => {
    const res = await request(app.getHttpServer())
      .post('/notes')
      .send({ title: 'Тестова нотатка', content: 'Контент' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.title).toBe('Тестова нотатка');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.content).toBe('Контент');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    createdId = res.body.id;
  });

  it('GET /notes - отримання всіх нотаток', async () => {
    const res = await request(app.getHttpServer()).get('/notes').expect(200);

    expect(res.body).toHaveProperty('items');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it('GET /notes/:id - отримання однієї нотатки', async () => {
    const res = await request(app.getHttpServer())
      .get(`/notes/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('content');
  });

  it('PUT /notes/:id - оновлення нотатки', async () => {
    const res = await request(app.getHttpServer())
      .put(`/notes/${createdId}`)
      .send({ title: 'Оновлена назва', content: 'Оновлений контент' })
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.title).toBe('Оновлена назва');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.content).toBe('Оновлений контент');
  });

  it('DELETE /notes/:id - видалення нотатки', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/notes/${createdId}`)
      .expect(200);

    expect(res.body).toEqual({ success: true });
  });

  it('GET /notes/:id - після видалення (404)', async () => {
    await request(app.getHttpServer()).get(`/notes/${createdId}`).expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
