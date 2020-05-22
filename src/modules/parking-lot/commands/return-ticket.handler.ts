import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ReturnTicketCommand } from './return-ticket.command';
import { ParkingLot } from 'src/models/parking-lot';

@CommandHandler(ReturnTicketCommand)
export class ReturnTicketHandler
  implements ICommandHandler<ReturnTicketCommand> {
  constructor(private eventPublisher: EventPublisher) {}
  async execute(command: ReturnTicketCommand) {
    const { slotId } = command;
    const parkingLot = this.eventPublisher.mergeObjectContext(new ParkingLot());
  
    // const freedSlotId = parkingLot.returnTicket();
    // return { slotId: freedSlotId };
  }
}
