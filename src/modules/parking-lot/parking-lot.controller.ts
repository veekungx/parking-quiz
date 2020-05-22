import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';
import { CarSize } from 'src/car';
import { IssueTicketCommand } from './issue-ticket.command';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  create(@Body() numOfSlots: number) {
    const command = new CreateParkingLotCommand(numOfSlots);
    const result = this.commandBus.execute(command);
    return result;
  }

  issueTicket(plateNumber: string, carSize: CarSize) {}
}
