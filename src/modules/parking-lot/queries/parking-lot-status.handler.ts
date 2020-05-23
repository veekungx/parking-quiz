import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ParkingLotStatusQuery } from './parking-lot-status.query';

@QueryHandler(ParkingLotStatusQuery)
export class ParkingLotStatusHandler
  implements IQueryHandler<ParkingLotStatusQuery> {
  async execute(): Promise<string> {
    return null;
  }
}
