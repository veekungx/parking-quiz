import { IssueTicketCommand } from './issue-ticket.command';
import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Ticket, TicketInfo } from '../../../models/ticket';
import { Car } from '../../../models/car';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';

@CommandHandler(IssueTicketCommand)
export class IssueTicketHandler implements ICommandHandler<IssueTicketCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly parkingLotRepository: ParkingLotRepository,
  ) {}
  async execute(command: IssueTicketCommand): Promise<TicketInfo> {
    const { plateNumber, carSize } = command;
    const parkingLot = this.eventPublisher.mergeObjectContext(
      await this.parkingLotRepository.get(),
    );

    const car = new Car(plateNumber, carSize);
    const ticket: Ticket = parkingLot.issueTicket(car);
    return ticket.getInfo();
  }
}
