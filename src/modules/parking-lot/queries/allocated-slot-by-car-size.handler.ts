import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AllocatedSlotByCarSizeQuery } from './allocated-slot-by-car-size.query';

@QueryHandler(AllocatedSlotByCarSizeQuery)
export class AllocatedSlotByCarSizeHandler
  implements IQueryHandler<AllocatedSlotByCarSizeQuery> {
  async execute(query: AllocatedSlotByCarSizeQuery): Promise<string[]> {
    return null;
  }
}
