import { Module } from '@nestjs/common';
import { ParkingLotController } from './parking-lot.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';

@Module({
  imports: [CqrsModule],
  controllers: [ParkingLotController],
  providers: [ParkingLotRepository, ...CommandHandlers, ...EventHandlers],
})
export class ParkingLotModule {}
