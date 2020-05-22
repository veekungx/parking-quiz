import { IssueTicketCommand } from './issue-ticket.command';
import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ParkingLot } from '../../../models/parking-lot';
import { Ticket, TicketInfo } from 'src/models/ticket';
import { Car } from 'src/models/car';

@CommandHandler(IssueTicketCommand)
export class IssueTicketHandler implements ICommandHandler<IssueTicketCommand> {
  constructor(private eventPublisher: EventPublisher) {}
  async execute(command: IssueTicketCommand): Promise<TicketInfo> {
    const { plateNumber, carSize } = command;
    const parkingLot = this.eventPublisher.mergeObjectContext(new ParkingLot());

    const car = new Car(plateNumber, carSize);
    const ticket: Ticket = parkingLot.issueTicket(car);
    return ticket.getInfo();
  }
}
