import { CarSize } from '../../../models/car';

export class TicketIssuedEvent {
  constructor(
    public readonly plateNumber: string,
    public readonly carSize: CarSize,
    public readonly slotId: number,
  ) {}
}
