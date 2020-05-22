import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { CarSize } from '../../../src/car';
import { ParkingLotController } from './parking-lot.controller';
import { CreateParkingLotCommand } from './create-parking-lot.command';

describe('ParkingLotController', () => {
  const mockCommandBus = { execute: jest.fn() };
  let parkingLotController: ParkingLotController;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ParkingLotController],
      providers: [{ provide: CommandBus, useValue: mockCommandBus }],
    }).compile();

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

    it('should return status result', async () => {
      const response = { status: 'success' };
      mockCommandBus.execute.mockImplementation(() => response);
      const result = await parkingLotController.create(100);
      expect(result).toBe(response);
    });
  });
});
