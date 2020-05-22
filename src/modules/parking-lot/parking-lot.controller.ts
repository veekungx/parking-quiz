import { CommandBus } from '@nestjs/cqrs';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateParkingLotCommand } from './commands/create-parking-lot.command';
import { IssueTicketCommand } from './commands/issue-ticket.command';
import { ReturnTicketCommand } from './commands/return-ticket.command';
import { CarSize } from '../../models/car';
import { TicketInfo } from '../../models/ticket';
import { CreateParkingLotDto } from './dtos/create-parking-lot.dto';
import { IssueTicketDto } from './dtos/issue-ticket.dto';
import { ReturnTicketDto } from './dtos/return-ticket.dto';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  async create(@Body() createParkingLotDto: CreateParkingLotDto): Promise<any> {
    const { numOfSlots } = createParkingLotDto;
    const command = new CreateParkingLotCommand(numOfSlots);
    const result = await this.commandBus.execute(command);
    return result;
  }

  @Post('issue-ticket')
  @HttpCode(200)
  async issueTicket(
    @Body() issueTicketDto: IssueTicketDto,
  ): Promise<TicketInfo> {
    const { plateNumber, carSize } = issueTicketDto;
    const command = new IssueTicketCommand(plateNumber, carSize);
    const ticketInfo: TicketInfo = await this.commandBus.execute(command);
    return ticketInfo;
  }

  @Post('return-ticket')
  @HttpCode(200)
  async returnTicket(@Body() returnTicketDto: ReturnTicketDto): Promise<any> {
    const { slotId } = returnTicketDto;
    const command = new ReturnTicketCommand(slotId);
    const ticketInfo: TicketInfo = await this.commandBus.execute(command);
    return ticketInfo;
  }
}
