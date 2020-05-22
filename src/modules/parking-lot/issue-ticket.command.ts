import { CarSize } from 'src/car';

export class IssueTicketCommand {
  constructor(
    public readonly plateNumber: string,
    public readonly carSize: CarSize,
  ) {}
}
