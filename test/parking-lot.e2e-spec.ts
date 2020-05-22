import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CqrsModule, CommandBus } from '@nestjs/cqrs';
import { INestApplication } from '@nestjs/common';
import { ParkingLotModule } from '../src/modules/parking-lot/parking-lot.module';
import { CarSize } from '../src/car';
import { Ticket } from '../src/ticket';

describe('ParkingLot', () => {
  let app: INestApplication;
  const commandBus = {
    register: jest.fn(),
    execute: jest.fn(),
  };

  beforeAll(async () => {
    jest.resetAllMocks();
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
    const response = { status: 'success' };
    commandBus.execute.mockImplementation(() => response);

    return request(app.getHttpServer())
      .post('/parking-lot/create')
      .send({ numOfSlots })
      .expect(201)
      .expect(response);
  });

  it('POST /parking-lot/issue-ticket', () => {
    const plateNumber = 'ABCD-123';
    const carSize = CarSize.MEDIUM;
    const slotId = 3;

    const ticket = new Ticket(plateNumber, carSize, slotId);

    commandBus.execute.mockImplementation(() => ticket);

    return request(app.getHttpServer())
      .post('/parking-lot/issue-ticket')
      .send({
        plateNumber,
        carSize: CarSize.MEDIUM,
      })
      .expect(200)
      .expect({
        plateNumber,
        carSize,
        slotId,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
