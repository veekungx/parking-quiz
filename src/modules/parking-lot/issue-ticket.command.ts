import { CarSize } from 'src/car';

export class IssueTicketCommand {
  constructor(private plateNumber: string, private carSize: CarSize) {}
}
