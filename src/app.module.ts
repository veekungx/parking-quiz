import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { CreateParkingLotHandler } from './create-parking-lot.handler';
import { ParkingLotCreatedHandler } from './parking-lot-created.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [CreateParkingLotHandler, ParkingLotCreatedHandler],
})
export class AppModule {}
