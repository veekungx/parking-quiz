import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';
import { CarSize } from '../../car';
import { IssueTicketCommand } from './issue-ticket.command';
import { TicketInfo } from '../../ticket';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  async create(@Body() numOfSlots: number): Promise<any> {
    const command = new CreateParkingLotCommand(numOfSlots);
    const result = await this.commandBus.execute(command);
    return result;
  }

  @Post('issue-ticket')
  @HttpCode(200)
  async issueTicket(
    plateNumber: string,
    carSize: CarSize,
  ): Promise<TicketInfo> {
    const command = new IssueTicketCommand(plateNumber, carSize);
    const ticketInfo: TicketInfo = await this.commandBus.execute(command);
    return ticketInfo;
  }
}
