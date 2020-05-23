import { CarSize } from '../../../models/car';

export class AllocatedSlotByCarSizeQuery {
  constructor(public readonly carSize: CarSize) {}
}
