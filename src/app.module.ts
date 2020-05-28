import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingLotModule } from './modules/parking-lot/parking-lot.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/parkinglot'),
    ParkingLotModule,
  ],
})
export class AppModule {}
