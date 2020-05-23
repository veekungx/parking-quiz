import { CarSize } from '../../../models/car';

export class PlateNumberByCarSizeQuery {
  constructor(public readonly carSize: CarSize) {}
}
