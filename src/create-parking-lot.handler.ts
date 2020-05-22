import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';

@CommandHandler(CreateParkingLotCommand)
export class CreateParkingLotHandler
  implements ICommandHandler<CreateParkingLotCommand> {
  constructor(private publisher: EventPublisher) {}
  async execute(command: CreateParkingLotCommand) {
    console.log(CreateParkingLotCommand.name);
  }
}
