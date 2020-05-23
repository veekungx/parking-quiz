import { AggregateRoot } from '@nestjs/cqrs';
import PriorityQueue from 'ts-priority-queue';
import { Car } from '../models/car';
import { ParkingLotCreatedEvent } from '../modules/parking-lot/events/parking-lot-created.event';
import { TicketIssuedEvent } from '../modules/parking-lot/events/ticket-issued.event';
import { Ticket } from './ticket';
import { ParkingLotFullError } from '../errors/parking-lot-full.error';
import { InvalidSlotSizeError } from '../errors/invalid-slot-size.error';

export class ParkingLot extends AggregateRoot {
  private slotMap: Map<number, Car> = new Map<number, Car>();
  private freeSlots = new PriorityQueue<number>({
    comparator: (a, b) => a - b,
  });

  createParkingLot(numOfSlots: number): void {
    if (numOfSlots <= 0) {
      throw new InvalidSlotSizeError();
    }

    for (let i = 1; i <= numOfSlots; i++) {
      this.slotMap.set(i, null);
      this.freeSlots.queue(i);
    }

    this.apply(new ParkingLotCreatedEvent(numOfSlots));
  }

  issueTicket(car: Car): Ticket {
    let ticket;
    const slotId = this.getAvailableSlot();

    if (slotId !== null) {
      ticket = new Ticket(car.getPlateNumber(), car.getCarSize(), slotId);
    } else {
      throw new ParkingLotFullError();
    }

    this.apply(
      new TicketIssuedEvent(
        ticket.getPlateNumber(),
        ticket.getCarSize(),
        ticket.getSlotId(),
      ),
    );
    return ticket;
  }

  returnTicket(slotId: number): number {
    this.freeSlots.queue(slotId);
    return slotId;
  }

  private getAvailableSlot(): number {
    if (this.freeSlots.length > 0) {
      return this.freeSlots.dequeue();
    } else {
      return null;
    }
  }
}
