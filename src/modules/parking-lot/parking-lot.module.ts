import { Module } from '@nestjs/common';
import { ParkingLotController } from './parking-lot.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { ParkingLotCommandHandlers } from './commands';
import { ParkingLotEventHandlers } from './events';
import { SlotRespository } from './repositories/slot.repository';
import { ParkingLotQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [ParkingLotController],
  providers: [
    ParkingLotRepository,
    SlotRespository,
    ...ParkingLotCommandHandlers,
    ...ParkingLotEventHandlers,
    ...ParkingLotQueryHandlers,
  ],
})
export class ParkingLotModule {}
