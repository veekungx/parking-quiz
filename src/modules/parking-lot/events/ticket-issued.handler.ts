import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TicketIssuedEvent } from './ticket-issued.event';
import { SlotRespository } from '../repositories/slot.repository';
import { Car } from '../../../models/car';

@EventsHandler(TicketIssuedEvent)
export class TicketIssuedHandler implements IEventHandler<TicketIssuedEvent> {
  constructor(private readonly slotRepository: SlotRespository) {}

  async handle(event: TicketIssuedEvent) {
    const { plateNumber, carSize, slotId } = event;

    const car = new Car(plateNumber, carSize);
    await this.slotRepository.addCarToSlot(slotId, car);
  }
}
