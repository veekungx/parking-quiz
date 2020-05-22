import { Test } from '@nestjs/testing';
import { ParkingLotController } from './parking-lot.controller';
import { CqrsModule, CommandBus } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';

describe('ParkingLotController', () => {
  let parkingLotController: ParkingLotController;
  const execute = jest.fn();
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [ParkingLotController],
    })
      .overrideProvider(CommandBus)
      .useValue({
        execute,
      })
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
      expect(execute).toHaveBeenCalledTimes(1);
      expect(execute).toHaveBeenCalledWith(command);
    });
  });
});
