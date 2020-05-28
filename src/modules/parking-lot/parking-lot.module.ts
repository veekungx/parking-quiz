import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { ParkingLotController } from './parking-lot.controller';
import { SlotRespository } from './repositories/slot.repository';
import { ParkingLotCommandHandlers } from './commands';
import { ParkingLotEventHandlers } from './events';
import { ParkingLotQueryHandlers } from './queries';
import { ParkingLotSchema } from './schemas/parking-lot.schema';
import { CarSchema } from './schemas/car.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'ParkingLotModel', schema: ParkingLotSchema },
      { name: 'CarModel', schema: CarSchema },
    ]),
  ],
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
