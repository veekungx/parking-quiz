import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateParkingLotCommand } from './create-parking-lot.command';

@Controller()
export class ParkingLotController {
  constructor(private readonly commandBus: CommandBus) {}

  create(numOfSlot: number) {
    const command = new CreateParkingLotCommand(numOfSlot);
    const result = this.commandBus.execute(command);
    return result;
  }
}
