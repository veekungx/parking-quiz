import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';
import { ParkingLot } from '../../../models/parking-lot';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';

@CommandHandler(CreateParkingLotCommand)
export class CreateParkingLotHandler
  implements ICommandHandler<CreateParkingLotCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly parkingLotRepository: ParkingLotRepository,
  ) {}
  async execute(command: CreateParkingLotCommand) {
    const { numOfSlots } = command;

    const parkingLot = this.publisher.mergeObjectContext(
      await this.parkingLotRepository.create(),
    );
    parkingLot.createParkingLot(numOfSlots);
    parkingLot.commit();

    return { status: 'success' };
  }
}
