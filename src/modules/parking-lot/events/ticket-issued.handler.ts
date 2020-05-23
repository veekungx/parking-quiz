import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TicketIssuedEvent } from './ticket-issued.event';
import { Car } from 'src/models/car';

@EventsHandler(TicketIssuedEvent)
export class TicketIssuedHandler implements IEventHandler<TicketIssuedEvent> {
  async handle(event: TicketIssuedEvent) {
    console.log(event);
    const { plateNumber, carSize, slotId } = event;

    // const slotMap = new Map();
    // const plateNumberByCarSizeMap = new Map();
    // const slotByCarSizeMap = new Map();

    // const car = new Car(plateNumber, carSize);
    // slotMap.set(slotId, car);
    // const pc = plateNumberByCarSizeMap.get(carSize);
    // pc
    //   ? plateNumberByCarSizeMap.set(carSize, [...pc, plateNumber])
    //   : plateNumberByCarSizeMap.set(carSize, [plateNumber]);

    // const sc = slotByCarSizeMap.get(carSize);
    // sc
    //   ? slotByCarSizeMap.set(carSize, [...sc, slotId])
    //   : slotByCarSizeMap.set(carSize, [slotId]);
  }
}
