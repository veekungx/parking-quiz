import { CreateParkingLotHandler } from './create-parking-lot.handler';
import { IssueTicketHandler } from './issue-ticket.handler';
import { ReturnTicketHandler } from './return-ticket.handler';

export const ParkingLotCommandHandlers = [
  CreateParkingLotHandler,
  IssueTicketHandler,
  ReturnTicketHandler,
];
