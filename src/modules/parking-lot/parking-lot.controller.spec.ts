import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { CarSize } from '../../../src/car';
import { ParkingLotController } from './parking-lot.controller';
import { CreateParkingLotCommand } from './create-parking-lot.command';
import { IssueTicketCommand } from './issue-ticket.command';

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

    jest.clearAllMocks();
  });

  describe('create', () => {
    it(`should execute ${CreateParkingLotCommand.name}`, async () => {
      const numOfSlots = 100;
      const command = new CreateParkingLotCommand(numOfSlots);

      await parkingLotController.create(numOfSlots);

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

  describe('issueTicker', () => {
    it(`should execute ${IssueTicketCommand.name}`, async () => {
      const plateNumber = 'ABCD-123';
      const carSize = CarSize.MEDIUM;
      const command = new IssueTicketCommand(plateNumber, carSize);

      await parkingLotController.issueTicket(plateNumber, carSize);

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
      expect(mockCommandBus.execute).toHaveBeenCalledWith(command);
    });

    it('should return information of plate number, car size and allocated parking slot', async () => {
      const plateNumber = 'ABCD-123';
      const carSize = CarSize.MEDIUM;
      const slotNumber = 3;

      const response = { plateNumber, carSize, slotNumber };
      mockCommandBus.execute.mockImplementation(() => response);

      const result = await parkingLotController.issueTicket(
        plateNumber,
        carSize,
      );

      expect(result).toBe(response);
    });
  });
});
