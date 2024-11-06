import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserInfoDto } from '../src/user-info/dto/create-user-info.dto';
import { PreferredTime } from '../src/user-info/schemas/user-info.schema';
import { UserInfoService } from '../src/user-info/user-info.service';

jest.mock('../src/user-info/user-info.service');

describe('UserInfoController (e2e)', () => {
  let app: INestApplication;
  let userInfoService: jest.Mocked<UserInfoService>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userInfoService = moduleFixture.get(UserInfoService);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/user-info (POST)', () => {
    // TODO: Test other properties errors
    // TODO: Test if accepts new attributes

    it('should create a entry with user infomation', async () => {
      const newUser: CreateUserInfoDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        deliveryAddress: 'Far away',
        preferredTime: PreferredTime.evening,
        specialInstructions: 'Something',
      };

      const expectedId = 'fakeId';

      userInfoService.create.mockResolvedValue({
        _id: expectedId,
        ...newUser,
      } as any);

      const response = await request(app.getHttpServer())
        .post('/user-info')
        .send(newUser)
        .expect(201);

      expect(response.body).toEqual({ _id: expectedId, ...newUser });
    });

    it('should return error if missing information', async () => {
      const newUser: Partial<CreateUserInfoDto> = {
        lastName: 'Doe',
        email: 'jane@example.com',
        deliveryAddress: 'Far away',
        preferredTime: PreferredTime.evening,
        specialInstructions: 'Something',
      };

      await request(app.getHttpServer())
        .post('/user-info')
        .send(newUser)
        .expect(400);
    });
  });
});
