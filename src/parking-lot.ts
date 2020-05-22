import PriorityQueue from 'ts-priority-queue';
import { Car } from './car';

export class ParkingLot {
  private slotMap: Map<number, Car> = new Map<number, Car>();
  private freeSlots = new PriorityQueue<number>({
    comparator: (a, b) => b - a,
  });

  public createParkingLot(numOfSlots: number): void {
    for (let i = 1; i <= numOfSlots; i++) {
      this.slotMap.set(i, null);
      this.freeSlots.queue(i);
    }
  }
}
