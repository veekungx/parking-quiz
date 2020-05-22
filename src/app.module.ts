import { Module } from '@nestjs/common';
import { ParkingLotModule } from './modules/parking-lot/parking-lot.module';

@Module({
  imports: [ParkingLotModule],
})
export class AppModule {}
