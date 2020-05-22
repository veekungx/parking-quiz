import { AggregateRoot } from '@nestjs/cqrs';
import PriorityQueue from 'ts-priority-queue';
import { Car, CarSize } from '../../car';
import { ParkingLotCreatedEvent } from './parking-lot-created.event';
import { TicketIssuedEvent } from './ticket-issued.event';
import { Ticket } from '../../ticket';

export class ParkingLot extends AggregateRoot {
  private slotMap: Map<number, Car> = new Map<number, Car>();
  private freeSlots = new PriorityQueue<number>({
    comparator: (a, b) => b - a,
  });

  public createParkingLot(numOfSlots: number): void {
    for (let i = 1; i <= numOfSlots; i++) {
      this.slotMap.set(i, null);
      this.freeSlots.queue(i);
    }

    this.apply(new ParkingLotCreatedEvent());
  }

  public issueTicket(plateNumber: string, carSize: CarSize): Ticket {
    let ticket;
    const slotId = this.getAvailableSlot();

    if (slotId !== null) {
      ticket = new Ticket(plateNumber, carSize, slotId);
    } else {
      throw new Error('Parking full');
    }

    this.apply(new TicketIssuedEvent());

    return ticket;
  }

  private getAvailableSlot(): number {
    if (this.freeSlots.length > 0) {
      return this.freeSlots.dequeue();
    } else {
      return null;
    }
  }
}
