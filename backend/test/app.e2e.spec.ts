import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../module/app.module';
import { INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv'
import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';
import { AllExceptionsFilter } from '../shared/exceptionFilter';
import { VehicleEntity } from '../model/vehicle.entity';
dotenv.config({ path: 'config/env/.test.env' })
describe('End to End (e2e) Test', () => {
  let app: INestApplication;
  let token: string
  let connection: Connection;
  let testData: VehicleEntity
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter())
    await app.init();
    connection = await moduleFixture.get(getConnectionToken());
  });
  afterAll(async () => {
    await connection.close()
  })

  it('(GET) [/]  should be 404', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
      .expect({ "statusCode": 404, "error": { "message": "Cannot GET /", "code": "Not Found" }, "path": "/" })
  });
  it('(GET) [/api/vehicle/list]  should be 404', () => {
    return request(app.getHttpServer())
      .get('/api/vehicle/list')
      .expect(404)
      .expect({ "statusCode": 404, "error": { "message": "Cannot GET /api/vehicle/list", "code": "Not Found" }, "path": "/api/vehicle/list" })
  });
  it('(POST) [/api/vehicle/list] should be 500', () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/list')
      .expect(500).then(res => {
        expect(res.body.error.message).toBe('Provided "offset" value is not a number. Please provide a numeric value.')
      })
  });
  it('(POST) [/api/vehicle/list] should be 200', () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/list')
      .send({ "page": 1, "itemPerPage": 10 })
      .expect(200).then(res => {
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(Array(res.body.data).length).toBeLessThanOrEqual(10)
        expect(res.body.total).toBeGreaterThanOrEqual(0)
      })
  });
  it('(POST) [/api/vehicle/access] should be 200', async () => {
    const data = await connection.getRepository(VehicleEntity).findOne()
    testData = data
    return request(app.getHttpServer())
      .post('/api/vehicle/access')
      .send({
        "vehicle_name": data.vehicle_name,
        "vehicle_id": data.id
      })
      .expect(200).then(res => {
        token = res.body.token
        expect(res.body).toHaveProperty("token");
        expect(typeof res.body.token).toBe('string');
      })
  })
  it('(POST) [/api/vehicle/access] should be 401 when invalid input', async () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/access')
      .send({
        "vehicle_name": 'invalid',
        "vehicle_id": 'invalid'
      })
      .expect(401).then(res => {
        expect(res.body.error.message).toBe('Invalid Vehicle Access')
      })
  })
  it('(POST) [/api/vehicle/tracking] should be 403 when not have JWT in header', async () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/tracking')
      .send({
        "lat": (Math.random() * 10).toString(),
        "long": (Math.random() * 10).toString()
      })
      .expect(403).then(res => {
        expect(res.body.error.message).toBe('Forbidden resource')
      })
  })
  it('(POST) [/api/vehicle/tracking] should be 200 when have JWT in header', async () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/tracking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "lat": (Math.random() * 10).toString(),
        "long": (Math.random() * 10).toString()
      })
      .expect(200).then(res => {
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body[0]).toHaveProperty('id')
      })
  })
  it('(POST) [/api/vehicle/register] should be 201', async () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/register')
      .send({
        "vehicle_name": new Date().getTime().toString()
      })
      .expect(201).then(res => {
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body[0]).toHaveProperty('id')
      })
  })
  it('(POST) [/api/vehicle/register] should be 500 when not send request body', async () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/register')
      .expect(500)
  })
  it('(POST) [/api/vehicle/history] should be 500 when not send request body', async () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/history')
      .expect(500)
  })
  it('(POST) [/api/vehicle/history] should be 200 when send request body', async () => {
    return request(app.getHttpServer())
      .post('/api/vehicle/history')
      .send({
        "vehicle_name": testData.vehicle_name,
        "paging": {
          "page": 1,
          "itemPerPage": 10
        },
        "criteria": {
          "start_date": "2020-12-31T17:00:00.000Z",
          "end_date": "2021-01-29T03:52:59.993Z"
        }
      })
      .expect(200).then(res => {
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(Array(res.body.data).length).toBeLessThanOrEqual(10)
        expect(res.body.total).toBeGreaterThanOrEqual(0)
      })
  })

});
