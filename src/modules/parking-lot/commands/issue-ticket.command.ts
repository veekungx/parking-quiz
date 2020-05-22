import { CarSize } from '../../../models/car';

export class IssueTicketCommand {
  constructor(
    public readonly plateNumber: string,
    public readonly carSize: CarSize,
  ) {}
}
