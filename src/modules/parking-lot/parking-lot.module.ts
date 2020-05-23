import { Module } from '@nestjs/common';
import { ParkingLotController } from './parking-lot.controller';
import { CreateParkingLotHandler } from './commands/create-parking-lot.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { IssueTicketHandler } from './commands/issue-ticket.handler';
import { ReturnTicketHandler } from './commands/return-ticket.handler';

const commandHandlers = [
  CreateParkingLotHandler,
  IssueTicketHandler,
  ReturnTicketHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ParkingLotController],
  providers: [ParkingLotRepository, ...commandHandlers],
})
export class ParkingLotModule {}
