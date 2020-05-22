import { IssueTicketCommand } from './issue-ticket.command';
import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ParkingLot } from '../../../models/parking-lot';
import { Ticket, TicketInfo } from 'src/models/ticket';

@CommandHandler(IssueTicketCommand)
export class IssueTicketHandler implements ICommandHandler<IssueTicketCommand> {
  constructor(private eventPublisher: EventPublisher) {}
  async execute(command: IssueTicketCommand): Promise<TicketInfo> {
    const { plateNumber, carSize } = command;
    const parkingLot = this.eventPublisher.mergeObjectContext(new ParkingLot());

    const ticket: Ticket = parkingLot.issueTicket(plateNumber, carSize);
    return ticket.getInfo();
  }
}
