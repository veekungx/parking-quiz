import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';
import { ParkingLot } from './parking-lot';

@CommandHandler(CreateParkingLotCommand)
export class CreateParkingLotHandler
  implements ICommandHandler<CreateParkingLotCommand> {
  constructor(private publisher: EventPublisher) {}
  async execute(command: CreateParkingLotCommand) {
    const { numOfSlots } = command;

    const parkingLot = this.publisher.mergeObjectContext(new ParkingLot());
    parkingLot.createParkingLot(numOfSlots);
    parkingLot.commit();

    return { status: 'success' };
  }
}
