import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AllocatedSlotByCarSizeQuery } from './allocated-slot-by-car-size.query';
import { SlotRespository } from '../repositories/slot.repository';

@QueryHandler(AllocatedSlotByCarSizeQuery)
export class AllocatedSlotByCarSizeHandler
  implements IQueryHandler<AllocatedSlotByCarSizeQuery> {
  constructor(private readonly slotRepository: SlotRespository) {}
  async execute(query: AllocatedSlotByCarSizeQuery): Promise<number[]> {
    const { carSize } = query;

    const allocatedSlots = await this.slotRepository.getAllocatedSlotByCarSize(
      carSize,
    );

    return allocatedSlots;
  }
}
