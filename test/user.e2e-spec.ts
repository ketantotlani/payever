import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../src/users/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const id = 2;


  it('/api/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        email: 'dummy-email@gmail.com',
        first_name: 'Dummy',
        last_name: 'Name',
        avatar:
          'https://www.imgworlds.com/wp-content/uploads/2015/11/1-PLANYOURVISIT-ticketbookings420X290.jpg',
      })
      .expect(201)
      .expect(Object);
  });

  it('/api/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/api/user/${id}`)
      .expect(200)
      .expect(Object);
  });

  it('/api/user/:id/avatar (GET)', () => {
    return request(app.getHttpServer())
      .get(`/api/user/${id}/avatar`)
      .expect(200)
      .expect(String);
  });

  it('/api/user/:id/avatar (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/user/${id}/avatar`)
      .expect(200)
      .expect('OK');
  });
});
