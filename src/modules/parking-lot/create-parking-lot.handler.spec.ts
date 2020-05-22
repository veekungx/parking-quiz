import { Test } from '@nestjs/testing';
import { CreateParkingLotHandler } from './create-parking-lot.handler';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';

describe('CreateParkingLotHandler', () => {
  let handler: CreateParkingLotHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CreateParkingLotHandler, EventPublisher],
    }).compile();
    handler = moduleRef.get<CreateParkingLotHandler>(CreateParkingLotHandler);
  });

  describe('execute', () => {
    it('should success', async () => {
      const command = new CreateParkingLotCommand(100);
      const result = await handler.execute(command);
      expect(result).toEqual({ status: 'success' });
    });
  });
});
