import { Module } from '@nestjs/common';
import { ParkingLotController } from './parking-lot.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';
import { SlotRespository } from './repositories/slot.repository';
import { QueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [ParkingLotController],
  providers: [
    ParkingLotRepository,
    SlotRespository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ParkingLotModule {}
