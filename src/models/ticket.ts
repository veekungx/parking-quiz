import { CarSize } from './car';

export interface TicketInfo {
  plateNumber: string;
  carSize: CarSize;
  slotId: number;
}

export class Ticket {
  constructor(
    private plateNumber: string,
    private carSize: CarSize,
    private slotId: number,
  ) {}

  public getInfo(): TicketInfo {
    return {
      plateNumber: this.plateNumber,
      carSize: this.carSize,
      slotId: this.slotId,
    };
  }

  public getPlateNumber(): string {
    return this.plateNumber;
  }

  public getCarSize(): CarSize {
    return this.carSize;
  }

  public getSlotId(): number {
    return this.slotId;
  }
}
