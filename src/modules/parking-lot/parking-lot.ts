import { AggregateRoot } from '@nestjs/cqrs';
import PriorityQueue from 'ts-priority-queue';
import { Car } from '../../car';
import { ParkingLotCreatedEvent } from './parking-lot-created.event';

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
}
