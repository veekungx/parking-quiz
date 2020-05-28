import { Test } from '@nestjs/testing';
import { CreateParkingLotHandler } from './create-parking-lot.handler';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';
import { ParkingLotCommandHandlers } from '.';
import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

const MockParkingLotModel: Provider = {
  provide: getModelToken('ParkingLotModel'),
  useValue: {},
};

const MockCarModel: Provider = {
  provide: getModelToken('CarModel'),
  useValue: {},
};
describe('CreateParkingLotHandler', () => {
  let handler: CreateParkingLotHandler;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        EventPublisher,
        CreateParkingLotHandler,
        ParkingLotRepository,
        MockParkingLotModel,
        MockCarModel,
      ],
    }).compile();
    handler = moduleRef.get<CreateParkingLotHandler>(CreateParkingLotHandler);
  });

  describe('execute', () => {
    it('should registered to ParkingLotHandlers', () => {
      const actual = ParkingLotCommandHandlers.indexOf(CreateParkingLotHandler);
      expect(actual).not.toBe(-1);
    });

    it('should success', async () => {
      const command = new CreateParkingLotCommand(100);
      const result = await handler.execute(command);
      expect(result).toEqual({ status: 'success' });
    });
  });
});
