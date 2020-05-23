import { TicketIssuedHandler } from './ticket-issued.handler';
import { ParkingLotCreatedHandler } from './parking-lot-created.handler';

export const ParkingLotEventHandlers = [
  TicketIssuedHandler,
  ParkingLotCreatedHandler,
];
