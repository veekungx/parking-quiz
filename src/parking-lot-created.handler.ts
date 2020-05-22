import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ParkingLotCreatedEvent } from './parking-lot-created.event';

@EventsHandler(ParkingLotCreatedEvent)
export class ParkingLotCreatedHandler
  implements IEventHandler<ParkingLotCreatedEvent> {
  handle(event: ParkingLotCreatedEvent) {
    console.log('parking lot created');
  }
}
