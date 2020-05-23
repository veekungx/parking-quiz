import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PlateNumberByCarSizeQuery } from './plate-number-by-car-size.query';
import { SlotRespository } from '../repositories/slot.repository';

@QueryHandler(PlateNumberByCarSizeQuery)
export class PlateNumberByCarSizeHandler
  implements IQueryHandler<PlateNumberByCarSizeQuery> {
  constructor(private readonly slotRespository: SlotRespository) {}
  async execute(query: PlateNumberByCarSizeQuery): Promise<string[]> {
    const { carSize } = query;
    return await this.slotRespository.getPlateNumberByCarSize(carSize);
  }
}
