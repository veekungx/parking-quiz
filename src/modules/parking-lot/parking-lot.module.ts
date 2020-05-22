import { Module } from '@nestjs/common';
import { ParkingLotController } from './parking-lot.controller';
import { CreateParkingLotHandler } from './commands/create-parking-lot.handler';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [CreateParkingLotHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ParkingLotController],
  providers: [...commandHandlers],
})
export class ParkingLotModule {}
