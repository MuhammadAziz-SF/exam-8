import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/api/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entities/users.entity';
import { Repository } from 'typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    userRepository = moduleFixture.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  beforeEach(async () => {
    // Clean up before each test
    await userRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    const createUserDto = {
      email: 'e2e.test@example.com',
      password: 'password123',
      firstName: 'E2E',
      lastName: 'Test',
      phoneNumber: '1234567890',
      passportNumber: 'E2E123',
      nationality: 'Testland',
      dateOfBirth: '2000-01-01',
    };

    it('should create a new user and return it without the password', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      expect(res.body).toBeDefined();
      expect(res.body.email).toEqual(createUserDto.email);
      expect(res.body.password).toBeUndefined();
      expect(res.body.id).toBeDefined();
      createdUserId = res.body.id;

      // Verify user exists in the database
      const userInDb = await userRepository.findOneBy({ id: createdUserId });
      expect(userInDb).toBeDefined();
      expect(userInDb.email).toEqual(createUserDto.email);
    });

    it('should fail with validation error for bad request', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'not-an-email', password: 'short' })
        .expect(400);
    });
  });
});
