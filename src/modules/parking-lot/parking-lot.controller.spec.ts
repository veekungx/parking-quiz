import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { CarSize } from '../../models/car';
import { ParkingLotController } from './parking-lot.controller';
import { CreateParkingLotCommand } from './commands/create-parking-lot.command';
import { IssueTicketCommand } from './commands/issue-ticket.command';
import { ReturnTicketCommand } from './commands/return-ticket.command';
import { CreateParkingLotDto } from './dtos/create-parking-lot.dto';
import { IssueTicketDto } from './dtos/issue-ticket.dto';
import { ReturnTicketDto } from './dtos/return-ticket.dto';

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
      const dto = new CreateParkingLotDto();
      dto.numOfSlots = 100;

      await parkingLotController.create(dto);

      const command = new CreateParkingLotCommand(dto.numOfSlots);
      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
      expect(mockCommandBus.execute).toHaveBeenCalledWith(command);
    });

    it('should return status result', async () => {
      const response = { status: 'success' };
      const dto = new CreateParkingLotDto();
      dto.numOfSlots = 100;

      mockCommandBus.execute.mockImplementation(() => response);

      const result = await parkingLotController.create(dto);
      expect(result).toBe(response);
    });
  });

  describe('issueTicker', () => {
    it(`should execute ${IssueTicketCommand.name}`, async () => {
      const dto = new IssueTicketDto();
      dto.plateNumber = 'ABCD-123';
      dto.carSize = CarSize.MEDIUM;
      await parkingLotController.issueTicket(dto);

      const { plateNumber, carSize } = dto;
      const command = new IssueTicketCommand(plateNumber, carSize);
      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
      expect(mockCommandBus.execute).toHaveBeenCalledWith(command);
    });

    it('should return information of plate number, car size and allocated parking slot', async () => {
      const slotNumber = 3;
      const dto = new IssueTicketDto();
      dto.plateNumber = 'ABCD-123';
      dto.carSize = CarSize.MEDIUM;
      await parkingLotController.issueTicket(dto);

      const { plateNumber, carSize } = dto;
      const response = { plateNumber, carSize, slotNumber };
      mockCommandBus.execute.mockImplementation(() => response);

      const result = await parkingLotController.issueTicket(dto);
      expect(result).toBe(response);
    });
  });

  describe('returnTicket', () => {
    it(`should execute ${ReturnTicketCommand.name}`, async () => {
      const dto = new ReturnTicketDto();
      dto.slotId = 3;
      await parkingLotController.returnTicket(dto);

      const { slotId } = dto;
      const command = new ReturnTicketCommand(slotId);
      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
      expect(mockCommandBus.execute).toHaveBeenCalledWith(command);
    });

    it('should return status', async () => {
      const dto = new ReturnTicketDto();
      dto.slotId = 3;
      const response = { status: 'success' };
      mockCommandBus.execute.mockImplementation(() => response);

      const result = await parkingLotController.returnTicket(dto);

      expect(result).toBe(response);
    });
  });
});
