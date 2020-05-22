import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import AppController from './app.controller';
import { CreateParkingLotHandler } from './create-parking-lot.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [CreateParkingLotHandler],
})
export class AppModule {}
