import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateCoffeeDto } from 'src/dto/coffee.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
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
  });

  it('/ping (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/ping')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(new Date(response.body.timestamp).toString()).not.toBe(
      'Invalid Date',
    );
  });

  it('/coffee (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/coffee')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('type');
      expect(response.body[0]).toHaveProperty('imageUrl');
      expect(response.body[0]).toHaveProperty('price');
    }
  });

  describe('/coffee (POST)', () => {
    const randomName = `Mocha-${Date.now()}`;

    const newCoffee: CreateCoffeeDto = {
      description: 'test',
      imageUrl:
        'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
      name: randomName,
      price: 1234,
      type: 'ROBUSTA',
    };

    it('should fail if bad request', async () => {
      const response = await request(app.getHttpServer())
        .post('/coffee')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', 400);
      expect(response.body).toHaveProperty('message');
      expect(Array.isArray(response.body.message)).toBe(true);

      expect(response.body.message).toEqual(
        expect.arrayContaining([
          'name should not be empty',
          'name must be a string',
          'description should not be empty',
          'description must be a string',
          'type must be one of the following values: ARABIC, ROBUSTA',
          'price must be a positive number',
          'price must be a number conforming to the specified constraints',
          'imageUrl must be a URL address',
          'imageUrl must be a string',
        ]),
      );
    });

    it('should create a new coffee', async () => {
      const response = await request(app.getHttpServer())
        .post('/coffee')
        .send(newCoffee)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newCoffee.name);
    });

    it('should return conflict on duplicate name', async () => {
      const response = await request(app.getHttpServer())
        .post('/coffee')
        .send(newCoffee)
        .expect(409);

      expect(response.body).toEqual({
        statusCode: 409,
        message: 'The name already exists',
        error: 'Conflict',
      });
    });
  });
});
