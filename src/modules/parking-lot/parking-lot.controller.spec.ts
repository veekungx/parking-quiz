import { Test } from '@nestjs/testing';
import { ParkingLotController } from './parking-lot.controller';
import { CqrsModule, CommandBus } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';

describe('ParkingLotController', () => {
  const mockCommandBus = { execute: jest.fn() };
  let parkingLotController: ParkingLotController;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [ParkingLotController],
    })
      .overrideProvider(CommandBus)
      .useValue(mockCommandBus)
      .compile();

    parkingLotController = moduleRef.get<ParkingLotController>(
      ParkingLotController,
    );
  });

  describe('create', () => {
    it('should execute CreateParkingLotCommand', async () => {
      const numOfSlots = 100;
      await parkingLotController.create(numOfSlots);
      const command = new CreateParkingLotCommand(numOfSlots);
      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
      expect(mockCommandBus.execute).toHaveBeenCalledWith(command);
    });
  });
});
