import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { CreateParkingLotCommand } from './commands/create-parking-lot.command';
import { IssueTicketCommand } from './commands/issue-ticket.command';
import { ReturnTicketCommand } from './commands/return-ticket.command';
import { TicketInfo } from '../../models/ticket';
import { CreateParkingLotDto } from './dtos/create-parking-lot.dto';
import { IssueTicketDto } from './dtos/issue-ticket.dto';
import { ReturnTicketDto } from './dtos/return-ticket.dto';
import { ParkingLotStatusQuery } from './queries/parking-lot-status.query';
import { PlateNumberByCarSizeQuery } from './queries/plate-number-by-car-size.query';
import { GetPlateNumbersByCarSizeDto } from './dtos/get-plate-numbers-by-car-size.dto';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('status')
  async status(): Promise<string> {
    const query = new ParkingLotStatusQuery();
    const statusReport: string = await this.queryBus.execute(query);
    return statusReport;
  }

  @Get('plate-numbers')
  async getPlateNumbers(
    @Body() getPlateNumbersByCarSizeDto: GetPlateNumbersByCarSizeDto,
  ): Promise<string[]> {
    const { carSize } = getPlateNumbersByCarSizeDto;
    const query = new PlateNumberByCarSizeQuery(carSize);
    const plateNumbers: string[] = await this.queryBus.execute(query);
    return plateNumbers;
  }

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
    const freedSlotId = await this.commandBus.execute(command);
    return freedSlotId;
  }
}
