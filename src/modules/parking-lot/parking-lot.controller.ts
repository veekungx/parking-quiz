import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './commands/create-parking-lot.command';
import { CarSize } from '../../models/car';
import { IssueTicketCommand } from './commands/issue-ticket.command';
import { TicketInfo } from '../../models/ticket';
import { ReturnTicketCommand } from './commands/return-ticket.command';

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

  @Post('return-ticket')
  @HttpCode(200)
  async returnTicket(slotId: number): Promise<any> {
    const command = new ReturnTicketCommand(slotId);
    const ticketInfo: TicketInfo = await this.commandBus.execute(command);
    return ticketInfo;
  }
}
