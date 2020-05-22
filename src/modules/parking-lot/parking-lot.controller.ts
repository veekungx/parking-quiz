import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';

@Controller()
export class ParkingLotController {
  constructor(private readonly commandBus: CommandBus) {}

  onApplicationBootstrap() {
    const command = new CreateParkingLotCommand(100);
    this.commandBus.execute(command);
  }
}
