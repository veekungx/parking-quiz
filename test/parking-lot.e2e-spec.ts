import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CqrsModule, CommandBus } from '@nestjs/cqrs';
import { INestApplication } from '@nestjs/common';
import { ParkingLotModule } from '../src/modules/parking-lot/parking-lot.module';
import { CreateParkingLotCommand } from '../src/modules/parking-lot/create-parking-lot.command';

describe('ParkingLot', () => {
  let app: INestApplication;
  const commandBus = {
    register: jest.fn(),
    execute: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, ParkingLotModule],
    })
      .overrideProvider(CommandBus)
      .useValue(commandBus)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /parking-lot/create', () => {
    const numOfSlots = 100;
    return request(app.getHttpServer())
      .post('/parking-lot/create')
      .send({ numOfSlots })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
