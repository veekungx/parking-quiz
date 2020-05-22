import { Module } from '@nestjs/common';
import { ParkingLotController } from './parking-lot.controller';
import { ParkingLotCreatedHandler } from './parking-lot-created.handler';
import { CreateParkingLotHandler } from './create-parking-lot.handler';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [CreateParkingLotHandler];
const eventHandlers = [ParkingLotCreatedHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ParkingLotController],
  providers: [...commandHandlers, ...eventHandlers],
})
export class ParkingLotModule {}
