import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';
import { ParkingLot } from '../../../models/parking-lot';

@CommandHandler(CreateParkingLotCommand)
export class CreateParkingLotHandler
  implements ICommandHandler<CreateParkingLotCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly parkingLotRepository: ParkingLotRepository,
  ) {}
  async execute(command: CreateParkingLotCommand) {
    const { numOfSlots } = command;

    const parkingLot = this.publisher.mergeObjectContext(new ParkingLot());
    parkingLot.createParkingLot(numOfSlots);
    await this.parkingLotRepository.save(parkingLot);
    parkingLot.commit();

    return { status: 'success' };
  }
}
