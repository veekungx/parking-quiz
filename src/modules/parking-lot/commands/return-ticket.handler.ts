import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ReturnTicketCommand } from './return-ticket.command';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';

@CommandHandler(ReturnTicketCommand)
export class ReturnTicketHandler
  implements ICommandHandler<ReturnTicketCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly parkingLotRepository: ParkingLotRepository,
  ) {}
  async execute(command: ReturnTicketCommand) {
    const { slotId } = command;
    const parkingLot = this.eventPublisher.mergeObjectContext(
      await this.parkingLotRepository.get(),
    );

    const freedSlotId = parkingLot.returnTicket(slotId);
    parkingLot.commit();
    return { slotId: freedSlotId };
  }
}
