import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ParkingLotCreatedEvent } from './parking-lot-created.event';
import { SlotRespository } from '../repositories/slot.repository';

@EventsHandler(ParkingLotCreatedEvent)
export class ParkingLotCreatedHandler
  implements IEventHandler<ParkingLotCreatedEvent> {
  constructor(private readonly slotRepository: SlotRespository) {}
  async handle(event: ParkingLotCreatedEvent) {
    const { numOfSlots } = event;
    await this.slotRepository.initState(numOfSlots);
  }
}
