import { CarSize } from 'src/models/car';

export class PlateNumberByCarSizeQuery {
  constructor(public readonly carSize: CarSize) {}
}
